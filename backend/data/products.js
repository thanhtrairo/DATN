
const products = [
    {
        name: "Afnan Violet Bouquet For Women",
        image: "https://orchard.vn/wp-content/uploads/2022/02/Afnan-Violet-Bouquet-orchardvn-hinh2-165x165.jpg",
        description:
            "Afnan – một thương hiệu nước hoa đến từ Tiểu Vương Quốc Ả Rập, thương hiệu nổi tiếng với những chai nước hoa có hương thơm đặc biệt giống với một số chai nước hoa nổi tiếng trên thế giới nhưng với giá thành rẻ hơn mà chất lượng vẫn rất đảm bảo",
        price: 1650000,
        countInStock: 10,
        countInSold: 0,
        rating: 4,
        numReviews: 0,
        categories: "new"
    },
    {
        name: "Elizabeth Arden Green Tea Mimosa",
        image: "https://orchard.vn/wp-content/uploads/2022/02/Elizabeth-Arden-Green-Tea-Mimosa-orchardvn-hinh2.jpg",
        description:
            "Green Tea Mimosa của Elizabeth Arden tiếp nối tinh thần của dòng Green Tea kinh điển. Khi bạn cần tìm kiếm một loại nước hoa tao nhã, thanh mát và thư thái thì đây là một sựa lựa chọn xứng đáng.",
        price: 1000000,
        countInStock: 3,
        countInSold: 0,
        rating: 3,
        numReviews: 0,
        categories: "new"
    },
    {
        name: "Yves Saint Laurent Black Opium",
        image: "https://orchard.vn/wp-content/uploads/2022/02/YSL-black-opium-extreme-orchardvn-hinh1.jpg",
        description:
            "Yves Saint Laurent tiếp tục  cho ra mắt phiên bản Extreme của mùi hương Black Opium , là một hương thơm Vanilla Phương Đông hứa hẹn đem đến sức hút đầy bùng nổ và mãnh liệt cho mọi cô gái sở hữu.",
        price: 2150000,
        countInStock: 5,
        countInSold: 0,
        rating: 2,
        numReviews: 0,
        categories: "new"
    },
    {
        name: "Dior Sauvage Elixir Margiela",
        image: "https://orchard.vn/wp-content/uploads/2022/01/dior_sauvage_elixir_orchardvn_hinh2.png",
        description:
            "Dior Sauvage Elixir là hương thơm mới trong bộ sưu tập Sauvage của Dior, được ra mắt vào mùa hè 2021 được tạo nên bởi nhà chế tạo nước hoa Francois Demachy. Dior Sauvage luôn lọt top nước hoa nam được yêu thích trong phân khúc designer.",
        price: 4000000,
        countInStock: 8,
        countInSold: 0,
        rating: 4,
        numReviews: 0,
        categories: "new"
    },
    {
        name: "Maison Margiela Replican Springtime",
        image: "https://orchard.vn/wp-content/uploads/2022/02/nuoc-hoa-maison-margiela-replica-springtime-in-a-park-orchardvn-hinh5.jpg",
        description:
            "Mùa xuân nơi công viên giữa lòng đô thị, đó là khung cảnh mà Maison Margiela muốn ghi chép lại qua mùi hương Replica – Springtime in a Park. Đó là khoảng thời gian rực rỡ như bầu trời xanh ở trên những tán cây hoa anh đồng phớt hồng.",
        price: 2000000,
        countInStock: 4,
        countInSold: 0,
        rating: 4,
        numReviews: 0,
        categories: "new"
    },


    {
        name: "Bvlgari Omnia Amethyste EDT",
        image: "https://orchard.vn/wp-content/uploads/2014/06/Bvlgari-Omnia-Amethyste-EDT-_1a.jpg",
        description:
            "Bản chất của nước hoa Omia Amethyste là sự quý phái và tinh tế của hương thơm hoa Iris và vườn hồng trong buổi sớm tinh mơ. Được thiết kế với mùi hương thanh lịch và tinh tế. Omnia Amethyste chắc chắn dành riêng cho những người phụ nữ trẻ. Những người năng động và thích thể hiện bản thân mình thông qua một hương thơm tươi mới, thuần khiết.",
        price: 300000,
        countInStock: 10,
        countInSold: 0,
        rating: 3,
        numReviews: 0,
        categories: "mini"
    },
    {
        name: "Montblanc Legend Spirit Omnia",
        image: "https://orchard.vn/wp-content/uploads/2016/05/WjI5dlpjemRrT1M1elkyVnVaVGN1WTI5dEwybHpMMmx0WVdkbEwweHZjbVJoYm1SVVlYbHNiM0l2TXpNNE5qUTJNREEzTkRneU4xOXRZV2x1UHlSUVJGQk1RVkpIUlNRPTJ4bGMzVmphM00_xr0e-ym.jpg",
        description:
            "Montblanc Legend Spirit xuất hiện trên thị trường năm 2016 như một phiên bản mới của Legend từ năm 2011. Legend Spirit là ấn phẩm mới được công bố là mùi hương vượt thời gian và mát mẻ",
        price: 500000,
        countInStock: 3,
        countInSold: 0,
        rating: 4,
        numReviews: 0,
        categories: "mini"
    },
    {
        name: "Salvatore Ferragamo Signorina",
        image: "https://orchard.vn/wp-content/uploads/2018/01/for-her-eau-de-toilette-10ml-orchardvn-hinh1-165x165.jpg",
        description:
            "Signorina Ribelle của hãng Salvatore Ferragamo được ra mắt vào năm 2019, là một bản Flanker mới nhất của dòng nước hoa danh tiếng của hãng. Ferragamo Signorina Ribelle là hương thơm của người phụ nữ trẻ trung, nữ tính, tươi mới.",
        price: 400000,
        countInStock: 7,
        countInSold: 0,
        rating: 4,
        numReviews: 0,
        categories: "mini"
    },
    {
        name: "Kenzo Flower EDP Ribelleking",
        image: "https://orchard.vn/wp-content/uploads/2014/06/kenzo_flower_eau_de_parfum_refillable_spray_100ml_1.png",
        description:
            "Kenzo Flower là loại nước hoa dành cho những người phụ nữ thành thị hiện đại luôn hướng về thiên nhiên để tạo cảm hứng sống mới và sáng tạo cho riêng mình. Flower by Kenzo một đóa hoa giữa lòng thành phố. Mùi thơm này của Kenzo mang hương hoa nhẹ nhàng với dấu ấn của hoa violet,",
        price: 600000,
        countInStock: 5,
        countInSold: 0,
        rating: 2,
        numReviews: 0,
        categories: "mini"
    },
    {
        name: "Narciso Rodriguez Narciso Kenzo",
        image: "https://orchard.vn/wp-content/uploads/2017/06/nuoc-hoa-nu-narciso-rodriguez-for-her-edt-orchardvn-avt.jpg",
        description:
            "Nhà thiết kế người Mỹ hiện đại và trẻ trung Narciso Rodriguez ngay từ lúc bắt tung ra các loại nước hoa đầu tiên của mình, ngay lập tức đã tạo cho mình một chỗ đứng trong giới nước hoa và những sản phẩm đấy cũng trở thành cú hit ở Mỹ,",
        price: 800000,
        countInStock: 6,
        countInSold: 0,
        rating: 4,
        numReviews: 0,
        categories: "mini"
    },


    {
        name: "Maison Margiela Replican Helen",
        image: "https://orchard.vn/wp-content/uploads/2022/02/nuoc-hoa-maison-margiela-replica-springtime-in-a-park-orchardvn-hinh5.jpg",
        description:
            "Mùa xuân nơi công viên giữa lòng đô thị, đó là khung cảnh mà Maison Margiela muốn ghi chép lại qua mùi hương Replica – Springtime in a Park. Đó là khoảng thời gian rực rỡ như bầu trời xanh ở trên những tán cây hoa anh đồng phớt hồng.",
        price: 1000000,
        countInStock: 6,
        countInSold: 0,
        rating: 4,
        numReviews: 0,
        categories: "medium"
    },
    {
        name: "Penhaligon’s Heartless Helen",
        image: "https://orchard.vn/wp-content/uploads/2022/02/penhaligon_s-heartless-helen-orchardvn-hinh1.jpg",
        description:
            "Heartless Helen thuộc bộ sưu tập đình đám Potrait Colletion từ thương hiệu nước hoa niche Penhaligon’s. Ra đời vào năm 2019, chai nước hoa dành cho nữ giới này mang hình ảnh phần nắp đại diện bởi loài chim vẹt lộng lẫy.",
        price: 2000000,
        countInStock: 5,
        countInSold: 0,
        rating: 2,
        numReviews: 0,
        categories: "medium"
    },
    {
        name: "Dolce & Gabbana Velve Desire",
        image: "https://orchard.vn/wp-content/uploads/2022/02/DG_velvet_desire_orchardvn_hinh1.png",
        description:
            "The Velvet Collection  thuộc bộ sưu tập Niche  của nhà Dolce & Gabbana ra mắt giới mộ điệu nước hoa nhằm mang đến những mùi hương mang âm hưởng cổ điển, xa hoa và lộng lẫy của giới thượng lưu với các chi tiết thiết kế mạ vàng và bọc nhung êm ái trên nắp chai",
        price: 3000000,
        countInStock: 7,
        countInSold: 0,
        rating: 4,
        numReviews: 0,
        categories: "medium"
    },
    {
        name: "Franck Boclet Cocaine Unisex",
        image: "https://orchard.vn/wp-content/uploads/2022/02/nuoc-hoa-franck-boclet-cocaine-orchardvn-hinh1.jpg",
        description:
            "Cocain là chất gây nghiện từ hàng chục năm nay được xem là chất cấm với hàng loạt tranh cãi nhưng bây giờ nó đã được đặt tên cho một loại nước hoa unisex đến từ thương hiệu Franck Boclet.",
        price: 5000000,
        countInStock: 8,
        countInSold: 0,
        rating: 4,
        numReviews: 0,
        categories: "medium"
    },
    {
        name: "Amouage Meander For Women",
        image: "https://orchard.vn/wp-content/uploads/2021/01/amouage-meander-eau-de-parfum-orchard.vn_.jpg",
        description:
            "Meander là mùi hương nước hoa dành cho cả nam và nữ mới nhất được thương hiệu nước hoa niche Amouage cho ra mắt năm 2020. Hương thơm được mô tả là trong trẻo, khẽ khàng, an tịnh, lại có gì đó tươi sáng, Meander chậm rãi vấn an và ôm ấp tâm trí người ngửi.",
        price: 4000000,
        countInStock: 4,
        countInSold: 0,
        rating: 4,
        numReviews: 0,
        categories: "medium"
    },

]

export default products