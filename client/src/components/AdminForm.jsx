import React, { useState, useEffect } from 'react';
import axios from 'axios'

const AdminForm = (props) => {
    const [listProducts, setListProducts] = useState([]);
    const [stripeProductId, setStripeProductId] = useState("");
    const [listOfPricedProducts, setListOfPricedProducts] = useState([]);
    const [pricedStripeProduct, setPricedStripeProduct] = useState("");
    const [pricedDBName, setPricedDBName] = useState("")
    useEffect(() => {
        axios.get('http://localhost:8000/v1/products')
            .then(res => {
                const holdResponse = res.data.data;
                const result = [];
                const pricedArr = [];
                for(let i = 0; i < holdResponse.length; i++){
                    console.log(i)
                    if(holdResponse[i].default_price === null){
                        result.push(holdResponse[i]);
                    } else if(holdResponse[i].default_price != null && holdResponse[i].active != false){
                        pricedArr.push(holdResponse[i]);
                    }
                }
                setStripeProductId([...result][0].id);
                setListProducts([...result]);
                setDbName(result[0].name);
                setPricedDBName(pricedArr[0].name);
                setPricedStripeProduct([...pricedArr][0].id)
                setListOfPricedProducts([...pricedArr]);
            })
            .catch(err => console.error(err));
    }, [])


    //Product States
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [size, setSize] = useState([]);
    const [imgUrls, setImgUrls] = useState([]);
    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    const [img3, setImg3] = useState("");
    const [img4, setImg4] = useState("");
    const [brand, setBrand] = useState("");
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [mongoPrice, setMongoPrice] = useState('');

    //Price States
    const [stripePrice, setStripePrice] = useState("")
    const [price, setPrice] = useState("")


    //Database states
    const [dbName, setDbName] = useState("")

    const putImagesTogether = () => {
        const tempArray = [img1, img2, img3, img4]
        setImgUrls([...tempArray])
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        putImagesTogether();
        axios.post('http://localhost:8000/api/shoe', {
            name,
            description,
            imgUrls,
            size: size.split(","),
            price,
            brand,
            categories: categories.split(","),
            colors: colors.split(",")
        })
            .then(res => {
                console.log(res)
                console.log(imgUrls)
                axios.post('http://localhost:8000/v1/products', {
                    name,
                    description,
                    images: imgUrls
                })
                    .then(res => {
                        setName("");
                        setDescription("");
                        setBrand("");
                        setSize("");
                        setImg1("");
                        setImg2("");
                        setImg3("");
                        setImg4("");
                        setPrice("");
                        setColors([]);
                        setCategories([]);
                        setImgUrls([]);
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.error(err))
    }

    const priceSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/v1/prices', {
            stripePrice,
            stripeProductId
        })
            .then(res => {
                    const stripePriceId = res.data.id
                    axios.put('http://localhost:8000/v1/products/'+ stripeProductId , {
                        default_price: stripePriceId
                    })
                        .then(res => console.log(res))
                        .catch(err => console.error(err))
                    axios.get(`http://localhost:8000/db/shoe/${dbName}`)
                        .then(res => {
                            axios.put('http://localhost:8000/api/shoe/' + res.data._id, {
                                price: mongoPrice
                            })
                                .then(res => {
                                    setStripePrice("")
                                })
                                .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    const archiveProductHandler = (e) =>{
        e.preventDefault();
        axios.put('http://localhost:8000/v1/archive/' + pricedStripeProduct)
            .then(res => {
                axios.get(`http://localhost:8000/db/shoe/${pricedDBName}`)
                    .then(res => {
                        axios.delete('http://localhost:8000/api/shoe/' + res.data._id)
                            .then(res => console.log(res))
                            .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.error(err)) 
    }

    return (
        <div className='flex w-2/3 mx-auto my-10 justify-center lg:h-screen'>
            <div className='w-1/2'>
                <h2 className="text-center text-2xl">Add a Product</h2>
                <form className="mx-auto border p-3 rounded-md mt-2" onSubmit={onSubmitHandler}>
                    <div className='mb-3 row'>
                        <label htmlFor="" className="col-form-label">Product Name:</label>
                        <div>
                            <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setName(e.target.value)} value={name} />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label htmlFor="" className="col-form-label">Product Description:</label>
                        <div>
                            <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setDescription(e.target.value)} value={description} />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label htmlFor="" className="col-form-label">Product Brand:</label>
                        <div>
                            <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setBrand(e.target.value)} value={brand} />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label htmlFor="" className="col-form-label">Shoe Sizes:</label>
                        <div>
                            <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setSize(e.target.value)} value={size}/>
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label htmlFor="" className="col-form-label">Colors:</label>
                        <div>
                            <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setColors(e.target.value)} value={colors}/>
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label htmlFor="" className="col-form-label">Categories:</label>
                        <div>
                            <input type="text" className="w-full border rounded-md p-2" onChange={(e) => setCategories(e.target.value)} value={categories}/>
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label htmlFor="" className="col-form-label">Image URL 1:</label>
                        <div>
                            <input id="img1" type="text" className="w-full border rounded-md p-2" onChange={(e) => setImg1(e.target.value)} value={img1}/>
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label htmlFor="" className="col-form-label">Image URL 2:</label>
                        <div>
                            <input id="img2" type="text" className="w-full border rounded-md p-2" onChange={(e) => setImg2(e.target.value)} value={img2} />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label htmlFor="" className="col-form-label">Image URL 3:</label>
                        <div>
                            <input id="img3" type="text" className="w-full border rounded-md p-2" onChange={(e) => setImg3(e.target.value)} value={img3} />
                        </div>
                    </div>
                    <div className='mb-3 row'>
                        <label htmlFor="" className="col-form-label">Image URL 4:</label>
                        <div>
                            <input id="img4" type="text" className="w-full border rounded-md p-2" onChange={(e) => setImg4(e.target.value)} value={img4} />
                        </div>
                    </div>
                    <button type="submit" onClick={() => putImagesTogether()} className="bg-dark-blue hover:bg-light-blue text-white rounded-md p-2">Create Product</button>
                </form>
            </div>

            <div className='w-1/2'>

                <div>
                    <h2 className="text-center text-2xl mt-5">Add a price</h2>
                    <form className="mx-auto w-1/2 border p-3 mt-2" onSubmit={priceSubmitHandler}>
                        <div className='mb-3 row'>
                            <label htmlFor="" className="col-form-label">Price of Product:</label>
                            <div>
                                <input type="number" className="w-full border rounded-md p-2" 
                                onChange={(e) => {
                                    setStripePrice(e.target.value)
                                    setMongoPrice(e.target.value / 100)
                                }} 
                                value={stripePrice}/>
                            </div>
                        </div>
                        <div className='mb-3 row'>
                            <label htmlFor="" className="col-form-label">Products:</label>
                            <div>
                                <select className="w-full border rounded-md p-2" onChange={(e) => {
                                    setStripeProductId(e.target.value.split("@")[0])
                                    setDbName(e.target.value.split("@")[1])
                                }} 
                                    id="product-name"
                                >
                                    {listProducts.map((option, i) => {
                                        return <option key={i} value={`${option.id}@${option.name}`} name={option.name}>{option.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="bg-dark-blue hover:bg-light-blue text-white rounded-md p-2">Create Product Price</button>
                    </form>
                </div>
                
                <div>
                    <h2 className="text-center text-2xl mt-5">Delete a Product</h2>
                    <form className="mx-auto w-1/2 border p-3 mt-2" onSubmit={archiveProductHandler}>
                        <div className='mb-3 row'>
                            <label htmlFor="" className="col-form-label">List of Products:</label>
                            <div>
                                <select className="w-full border rounded-md p-2" 
                                onChange={(e) => {
                                    setPricedStripeProduct(e.target.value.split("@")[0])
                                    setPricedDBName(e.target.value.split("@")[1])
                                }} 
                                >
                                    {listOfPricedProducts.map((option, i) => {
                                        return <option key={i} value={`${option.id}@${option.name}`} name={option.name}>{option.name}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="bg-dark-blue hover:bg-light-blue text-white rounded-md p-2">Delete Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminForm;