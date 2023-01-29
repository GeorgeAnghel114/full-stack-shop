package com.codecool.sneakersStore.security;

import com.codecool.sneakersStore.service.ClientService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {

    private final ClientService clientService;
    private final JWTTokenHelper jWTTokenHelper;
    private final AuthenticationEntryPoint authenticationEntryPoint;

    public AppSecurityConfig(ClientService clientService, JWTTokenHelper jWTTokenHelper, AuthenticationEntryPoint authenticationEntryPoint) {
        this.clientService = clientService;
        this.jWTTokenHelper = jWTTokenHelper;
        this.authenticationEntryPoint = authenticationEntryPoint;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint).and()
                .authorizeRequests((request) -> request.antMatchers(
                        "/",
                        "/prod/products",
                        "/client/register",
                        "/client/login"
                     ).permitAll()
                )
                .authorizeRequests((request) -> {
                    try {
                        request.antMatchers(
                                "/",
                                        "/cart",
                                        "/cart/get-cart",
                                        "/prod/product/*",
                                        "/prod/product/**",
                                        "/cart/add-to-cart/**",
                                        "/cart/add-to-cart/**/**",
                                        "/cart/add-to-cart/*/*",
                                        "/cart/update-cart-item-quantity/*",
                                        "/cart/delete-cart-item/*/*",
                                        "/order/get-order/*",
                                        "/order/add-order/*"
                                ).hasRole("USER")
                                .and()
                                .authorizeRequests((req) -> req.antMatchers(
                                        "/admin",
                                                "/admin/**",
                                                "/category/**",
                                                "/supplier/**",
                                                "/brand/**",
                                                "/order/**"
                                        ).hasRole("ADMIN")
                                .anyRequest().authenticated())
                        .addFilterBefore(new JWTAuthenticationFilter(clientService, jWTTokenHelper),
                                UsernamePasswordAuthenticationFilter.class);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                });
        http.csrf().disable().cors().and().headers().frameOptions().disable();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
