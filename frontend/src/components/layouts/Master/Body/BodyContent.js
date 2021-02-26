import React from 'react'

const BodyContent = () => {
    return (
        <React.Fragment>
            <section className="slider_section ">
                <div id="customCarousel1" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="container ">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="detail-box">
                                            <h1> Welcome to our shop</h1>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste quam velit saepe dolorem deserunt quo quidem ad optio.</p>
                                            <a href="">Read More</a>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="img-box"><img src="images/slider-img.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default BodyContent
