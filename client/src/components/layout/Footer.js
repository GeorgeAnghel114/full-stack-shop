import classes from "./Footer.module.css";

function Footer() {
    return (
        <footer className={classes.footer}>
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
            ></link>

            <div className={classes.container}>
                <div className={classes.row}>
                    <div className={classes.footercol}>
                        <h4>Company</h4>
                        <ul className={classes.footerCols}>
                            <li>
                                <a href="/">About us</a>
                            </li>
                            <li>
                                <a href="/">our services</a>
                            </li>
                            <li>
                                <a href="/">privacy polcy</a>
                            </li>
                            <li>
                                <a href="/">affiliate program</a>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.footercol}>
                        <h4>get help</h4>
                        <ul className={classes.footerCols}>
                            <li>
                                <a href="/">FAQ</a>
                            </li>
                            <li>
                                <a href="/">shipping</a>
                            </li>
                            <li>
                                <a href="/">returns</a>
                            </li>

                            <li>
                                <a href="/">order status</a>
                            </li>
                            <li>
                                <a href="/">payment</a>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.footercol}>
                        <h4>online shop</h4>
                        <ul className={classes.footerCols}>
                            <li>
                                <a href="/">Sneakers men</a>
                            </li>
                            <li>
                                <a href="/">Sneakers women</a>
                            </li>
                            <li>
                                <a href="/">Clothing</a>
                            </li>
                            <li>
                                <a href="/">Accesories</a>
                            </li>
                        </ul>
                    </div>
                    <div className={classes.footercol}>
                        <h4>follow us</h4>
                        <ul className={classes.footerCols}>
                            <div className={classes.sociallinks}>
                                <a href="/">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="/">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="/">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                                <a href="/">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;