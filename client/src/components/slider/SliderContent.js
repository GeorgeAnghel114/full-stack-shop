
function SliderContent({activeIndex, imageSlider}) {
    return (
        <>
            {imageSlider.map((slide, index) => (
                <div
                    key={index}
                    className={
                        index === activeIndex ? "slides active" : "inactive"
                    }
                >
                    <img className="slide-image" src={slide.urls} alt="" />
                </div>
            ))}
        </>
    );
}

export default SliderContent;