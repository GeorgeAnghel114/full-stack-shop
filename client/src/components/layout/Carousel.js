import Carousel from 'react-elastic-carousel';
import classes from './Carousel.module.css';

export default function ProductsCarousel() {
    const breakPoints = [
        {width: 1, itemsToShow: 1},
        // {width: 550, itemsToShow: 2},
        // {width: 768, itemsToShow: 3},
        // {width: 1200, itemsToShow: 4},
    ]

    return (
        <div className={classes.carousel}>
            <Carousel breakPoints={breakPoints} isRTL>
                <div className={classes.item}>
                    <img src="https://i.pinimg.com/736x/aa/c4/01/aac4010e48731d0795f2759bab261a90.jpg"
                    alt='image' />
                </div>
                <div className={classes.item}>
                    <img src="https://cms-cdn.thesolesupplier.co.uk/2018/10/Jordan-1-Mid-White-Tuxedo-03.jpg"
                         alt='image' />
                </div>
                <div className={classes.item}>
                    <img src="https://cdn.shopify.com/s/files/1/0095/4420/4367/articles/DO9369-101_455x300@2x.jpg?v=1666198517"
                         alt='image' />
                </div>
                <div className={classes.item}>
                    <img src="https://i.pinimg.com/736x/a0/54/db/a054db3e0ad0ce6ec09b7059f651f845--jordan-shoes-online-nike-jordan-shoes.jpg"
                         alt='image' />
                </div>
                <div className={classes.item}>
                    <img src="https://i.pinimg.com/originals/ed/98/97/ed98976a548dcdb42fb39ebd9d158f51.jpg"
                         alt='image' />
                </div>
                <div className={classes.item}>
                    <img src="https://64.media.tumblr.com/197c067be6f402c63462da2341ab5667/d0c5bce0e0cd8693-3a/s500x750/303ec12f4dc53e2042482dd1ee47a762bb08ecf8.jpg"
                         alt='image' />
                </div>
                <div className={classes.item}>
                    <img src="https://www.kicksonfire.com/wp-content/uploads/2018/11/Union-x-Air-Jordan-1-Retro-High-OG-Black-Toe-5.png?x58464"
                         alt='image' />
                </div>
                <div className={classes.item}>
                    <img src="https://i.pinimg.com/originals/11/ca/e1/11cae1f6e7c3cc707e4d20a92677e697.jpg"
                         alt='image' />
                </div>
            </Carousel>
        </div>
    );
}

