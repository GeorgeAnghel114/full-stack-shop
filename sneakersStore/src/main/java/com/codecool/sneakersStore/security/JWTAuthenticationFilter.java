package com.codecool.sneakersStore.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JWTAuthenticationFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;
    private final JWTTokenHelper jwtTokenHelper;

    public JWTAuthenticationFilter(UserDetailsService userDetailsService, JWTTokenHelper jwtTokenHelper) {
        this.userDetailsService = userDetailsService;
        this.jwtTokenHelper = jwtTokenHelper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authToken = jwtTokenHelper.getToken(request);

        if (null != authToken) {

            String userName = jwtTokenHelper.getUsernameFromToken(authToken);

            if (null != userName) {

                UserDetails userDetails = userDetailsService.loadUserByUsername(userName);

                if (jwtTokenHelper.validateToken(authToken, userDetails)) {

                    Authentication auth = jwtTokenHelper.parseUserFromTokenInfo(authToken);

                    SecurityContextHolder.getContext().setAuthentication(auth);

                }

            }

        }

        filterChain.doFilter(request, response);
    }
}
