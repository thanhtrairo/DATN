
import React from 'react'

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="row py-5">
                    <div className="col-12 col-md-3">
                        <h3>Hướng dẫn</h3>
                        <ul>
                            <li><a href="">Cam Kết Từ Orchard</a></li>
                            <li><a href="">Đặt hàng & Thanh toán</a></li>
                            <li><a href="">Điều khoản mua hàng</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-3">
                        <h3>Liên hệ</h3>
                        <ul>
                            <li><a href="">228 Lý Chính Thắng, P.9, Q.3, Tp. Hồ Chí Minh</a></li>
                            <li><a href="">349 Hoàng Văn Thụ, P.2, Q.Tân Bình, Tp. Hồ Chí Minh ( Lăng Cha Cả )</a></li>
                            <li><a href="">27 Nguyễn Văn Trỗi, Phường 15, Phú Nhuận, Hồ Chí Minh</a></li>
                            <li><a href="">219 Nguyễn Thị Thập, Tân Phú, Quận 7, Hồ Chí Minh</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-3">
                        <h3>Về chúng tôi</h3>
                        <ul>
                            <li><a href="">Ra đời vào ngày 14/8/2004 và hiện tại là nơi cung cấp hơn 200 nhãn hiệu nước hoa cao cấp trên thế giới. Là website nước hoa đầu tiên tại Việt Nam. Định hướng của chúng tôi là trở thành nhà cung cấp nước hoa số 1 tại VN</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md-3">
                        <h3>Chúng tôi trên mạng xã hội</h3>
                        <ul>
                            <li><a href=""><i className="fab fa-facebook-f"></i> Facebook</a></li>
                            <li><a href=""><i className="fab fa-twitter"></i> Twiter</a></li>
                            <li><a href=""><i className="fab fa-google-plus-g"></i> Google +</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer_copyright">
                    <p>OFFICE 247 TSP CO.,LTD; 228 Lý Chính Thắng, P9, Q.3, TP HCM</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer