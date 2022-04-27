
import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

import Product from '../Components/Product'
import Loading from '../Components/LoadingError/Loading'
import Message from '../Components/LoadingError/Error'
import Footer from '../Components/Footer'
import HeaderBottom from '../Components/HeaderBottom'
import './ProductScreen.scss'

function ProductList() {

  const productList = useSelector(state => state.products)
  const { loading, error, products } = productList

  const {categorieList} = useSelector((state) => state.categories)

  const [selectCategories, setSelectCategories] = useState()

  const arrCategories = useMemo(() => {
    return products.filter(product => product.categories === selectCategories)
  }, [selectCategories, products])

  const [search, setSearch] = useState()

  const [arrSearchProduct, setArrSearchProduct] = useState([])

  const handleSearch = () => {
    setSelectCategories()
    setSort("default")
    if (search) {
      const arrSearch = products.filter(product => product.name.includes(search))
      setArrSearchProduct(arrSearch)
    } else {
      setArrSearchProduct([])
    }
  }

  const [sort, setSort] = useState("default")

  const arrProducts = useMemo(() => {
    const mediateArr = arrCategories?.length > 0 ? arrCategories : arrSearchProduct.length > 0 ? arrSearchProduct : products
    const newArrProducts = [...mediateArr]

    if (sort === "up") return newArrProducts.sort((a, b) => a.price - b.price)
    if (sort === "down") return newArrProducts.sort((a, b) => b.price - a.price)
    return newArrProducts

  }, [arrCategories, arrSearchProduct, products, sort])

  const [show, setShow] = useState(false)

  return (
    <>
      <HeaderBottom />
      <div className="container productScreen">
        <div className="row">
          <div className="col-1 d-sm-none sideBarIcon">
            <i className="fa fa-bars" onClick={() => setShow(!show)}></i>
          </div>
          <div className={clsx("d-sm-block col-sm-2 productLeft sideBar", {"translateSidebar": show}, "d-none")}>
            <h2>Danh mục</h2>
            <ul>
              <li onClick={() => setSelectCategories()}>Tất cả sản phẩm</li>
              {categorieList.map(category => (
                <li
                  key={category._id}
                  name={category.name}
                  onClick={() => setSelectCategories(category.name)}
                >
                  Sản phẩm {category.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-11 col-sm-10 productRight">
            <div className="productTopRight d-sm-flex align-items-center justify-content-between m-sm-4">
              <div className="input-group mb-2 mb-sm-0">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm sản phẩm"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <button
                  onClick={handleSearch}
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                >
                  Tìm kiếm
                </button>
              </div>
              <div>
                <select
                  onChange={e => setSort(e.target.value)}
                  value={sort}
                  className="form-select mb-4 mb-sm-0"
                  aria-label="Default select example">
                  <option value="default">Sắp xếp</option>
                  <option value="up">Giá tăng dần</option>
                  <option value="down">Giá giảm dần</option>
                </select>
              </div>
            </div>
            <div className="productBottomRight">
              <div className="row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  arrProducts?.length > 0
                    ? arrProducts
                    : products
                ).map((product) => (
                  <div className="col-6 col-sm-3 mb-5" key={product._id}>
                    <Product product={product} />
                  </div>
                ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductList