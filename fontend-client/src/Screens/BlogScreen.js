
import React from 'react'

import TitleCatagory from '../Components/TitleCatagory'
import HeaderBottom from '../Components/HeaderBottom'
import Footer from '../Components/Footer'
import './BlogScreen.scss'

function BlogScreen() {
    return (
        <>
            <HeaderBottom />
            <TitleCatagory>Tin tức</TitleCatagory>
            <div className="container blog">
                <div className="blogTop">
                    <div id="carouselExampleControls" className="carousel " data-bs-ride="">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="row">
                                    <div className="col-6 px-4">
                                        <img src="//orchard.vn/blog/wp-content/uploads/2020/09/mua-hang-tra-sau-0-lai-suat-orchard.vn-11-485x360.jpg" alt="" />
                                    </div>
                                    <div className="col-6 px-4">
                                        <h2>Mua Hàng Trả Sau 0% Lãi Suất Đã Có Mặt Tại Orchard</h2>
                                        <p>18 Tháng Chín, 2020</p>
                                        <h3>Muốn đi shopping nhưng lương chưa về ? Tháng này xài lố hết tiền đi mua mỹ phẩm ? Chai nước hoa yêu thích...</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="row">
                                    <div className="col-6 px-4">
                                        <img src="//orchard.vn/blog/wp-content/uploads/2021/01/tri-nam-obagi-orchard.vn_-485x360.jpg" alt="" />
                                    </div>
                                    <div className="col-6 px-4">
                                        <h2>Review Bộ Trị Nám Obagi – Diệt Nám Tàn Nhang Tận Gốc</h2>
                                        <p>14 Tháng Một, 2021</p>
                                        <h3>Obagi Medical được đánh giá là thương hiệu dược mỹ phẩm danh tiếng số 1 tại Mỹ. Đây cũng là thương hiệu tiên phong...</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="blogBottom">
                    <div className="row">
                        <div className="col-12 col-sm-8">
                            <div className="row">
                                <div className="col-6">
                                    <div className="blogBottomItem">
                                        <img src="https://orchard.vn/blog/wp-content/uploads/2016/06/perfumegosh-butik-485x360.jpg" alt="" />
                                        <h2>Nên Chọn Nước Hoa Nồng Độ EDT Hay EDP ?</h2>
                                        <p>6 Tháng Sáu, 2016</p>
                                        <h3>Với những ai đã từng dùng nước hoa thì không còn quá xa xạ với khái niệm EDT, EDP và nhiều khi đó còn...</h3>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="blogBottomItem">
                                        <img src="https://orchard.vn/blog/wp-content/uploads/2018/08/F_25224-485x360.jpg" alt="" />
                                        <h2>Tìm Hiểu Dược Mỹ Phẩm Là Gì Và Các Nhãn Hiệu Nổi Tiếng</h2>
                                        <p>11 Tháng Tám, 2018</p>
                                        <h3>Nếu như chỉ vài năm trước đây các loại hóa mỹ phẩm luôn là lựa chọn hàng đầu cho chăm sóc sắc đẹp của...</h3>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="blogBottomItem">
                                        <img src="https://orchard.vn/blog/wp-content/uploads/2016/07/Ralph-Lauren-Polo-Blue-485x360.jpg" alt="" />
                                        <h2>TOP Nước Hoa Dành Cho Các Bạn Nam Mùa Mưa Này</h2>
                                        <p>21 Tháng Bảy, 2016</p>
                                        <h3>Bạn hãy tưởng tượng sẽ tuyệt vời biết bao nếu trong mùa mưa này chính hương thơm nước hoa ấm áp, quyến rũ của...</h3>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="blogBottomItem">
                                        <img src="https://orchard.vn/blog/wp-content/uploads/2018/07/bi-quyet-cham-soc-da-cho-phu-nu-trong-do-tuoi-40-1-485x360.jpg" alt="" />
                                        <h2>Chăm Sóc Làn Da Tuổi 40+ Như Thế Nào?</h2>
                                        <p>10 Tháng Bảy, 2018</p>
                                        <h3>Lão hóa nội tại được xác định bởi di truyền, lập trình di truyền của bạn trên một mức độ tế bào kiểm soát,...</h3>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="blogBottomItem">
                                        <img src="https://orchard.vn/blog/wp-content/uploads/2021/10/245811545_4461318393948703_5960953880210028958_n-485x360.jpeg" alt="" />
                                        <h2>Khám Phá Hộp Quà Tặng 20-10 Sang Chảnh</h2>
                                        <p>18 Tháng Mười, 2021</p>
                                        <h3>Chúc mừng ngày phụ nữ Việt Nam 20/10, gửi tới những người phụ nữ đã mang tới tình yêu và những điều đẹp đẽ...</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="blogRight">
                                <h4>PHỔ BIẾN GẦN ĐÂY</h4>
                                <div className="row">
                                    <div className="col-4 my-3">
                                        <img src="https://orchard.vn/blog/wp-content/uploads/2016/06/perfumegosh-butik-100x70.jpg" alt="" />
                                    </div>
                                    <div className="col-8 my-3">
                                        <p>Nên Chọn Nước Hoa Nồng Độ EDT Hay EDP ?</p>
                                        <h5>6 Tháng Sáu, 2016</h5>
                                    </div>
                                    <div className="col-4 my-3">
                                        <img src="https://orchard.vn/blog/wp-content/uploads/2020/09/cau-noi-hay-ve-nuoc-hoa-orchard.vn-12-100x70.png" alt="" />
                                    </div>
                                    <div className="col-8 my-3">
                                        <p>Những Câu Nói Hay Về Nước Hoa Từ Người Nổi Tiếng</p>
                                        <h5>3 Tháng Chín, 2020</h5>
                                    </div>
                                    <div className="col-4 my-3">
                                        <img src="https://orchard.vn/blog/wp-content/uploads/2018/08/nuoc-hoa-hong-mamonde-rose-water-orchard.vn_-100x70.png" alt="" />
                                    </div>
                                    <div className="col-8 my-3">
                                        <p>Toner Là Gì Và Nước Hoa Hồng Có Phải Toner Không?</p>
                                        <h5>15 Tháng Tám, 2018</h5>
                                    </div>
                                    <div className="col-4 my-3">
                                        <img src="https://orchard.vn/blog/wp-content/uploads/2019/01/Cách-Sử-Dụng-AHA-BHA-Vitamin-C-Trong-Quy-Trình-Chăm-Sóc-Da-3-100x70.jpg" alt="" />
                                    </div>
                                    <div className="col-8 my-3">
                                        <p>Cách Sử Dụng AHA BHA Vitamin C Trong Quy Trình Chăm...</p>
                                        <h5>26 Tháng Một, 2019</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default BlogScreen