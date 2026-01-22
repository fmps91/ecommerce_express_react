import React from 'react'
import './ListProduct.css'
import { useState } from 'react'
import { useEffect } from 'react'
import cross_icon from '../../assets/cross_icon.png'
import axios from 'axios';

const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([])

    const fetchInfo = async () => {

        try {
            const resp = await axios.get('http://localhost:4000/allproducts')
            setAllProducts(resp.data.products);
        } catch (error) {
            console.error('Error en GET:', error);
            throw error;
        }
    }

    useEffect(() => {
        fetchInfo();
        console.log("productos: ", allproducts)
    }, [])

    const remove_product = async (id) => {
        try {
            const resp = await axios.post('http://localhost:4000/removeproduct', {
                id
            })
            fetchInfo();
        } catch (error) {
            console.log("error: ", error)
        }

    }

    return (
        <div className='list-product'>
            <h1>All Product List</h1>
            <div className="list-product-headers">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
        </div>
            <div className="list-product-allproducts">
                <hr />
                {allproducts.map((product, index) => {

                    return (
                    <div key={index}>
                        {/* Cambié la clase aquí también */}
                        <div className="product-item listproduct-format">
                            {/* Contenedor principal para móvil */}
                            <div className="product-mobile-view">
                                {/* Primera fila móvil: Imagen y nombre */}
                                <div className="mobile-row mobile-row-top">
                                    <img src={product.image} alt={product.name} className="listproduct-product-icon" />
                                    <div className="product-mobile-info">
                                        <p className="product-title">{product.name}</p>
                                        <p className="product-category">{product.category}</p>
                                    </div>
                                    <img 
                                        onClick={() => { remove_product(product.id) }} 
                                        src={cross_icon} 
                                        alt="Eliminar" 
                                        className="listproduct-remove-icon mobile-remove-icon" 
                                    />
                                </div>
                                
                                {/* Segunda fila móvil: Precios */}
                                <div className="mobile-row mobile-row-bottom">
                                    <div className="price-container">
                                        <div className="price-item">
                                            <span className="price-label">Old Price:</span>
                                            <span className="price-value">${product.old_price}</span>
                                        </div>
                                        <div className="price-item">
                                            <span className="price-label">New Price:</span>
                                            <span className="price-value">${product.new_price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Vista de escritorio (oculta en móvil) */}
                            <div className="product-desktop-view">
                                <img src={product.image} alt={product.name} className="listproduct-product-icon" />
                                <p className="desktop-title">{product.name}</p>
                                <p className="desktop-price">${product.old_price}</p>
                                <p className="desktop-price">${product.new_price}</p>
                                <p className="desktop-category">{product.category}</p>
                                <img 
                                    onClick={() => { remove_product(product.id) }} 
                                    src={cross_icon} 
                                    alt="Eliminar" 
                                    className="listproduct-remove-icon" 
                                />
                            </div>
                        </div>
                        <hr />
                    </div>
                )
                })}
            </div>
        </div>
    )
}

export default ListProduct