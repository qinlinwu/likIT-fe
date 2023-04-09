import React, { useEffect, useState } from 'react';
import { Select, message, Card, List, Tooltip, Button} from "antd";
import { addItemToCart, getMenus, getRestaurants } from "../utils";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddToCartButton = ({ itemId }) => {
    const [loading, setLoading] = useState(false);

    const AddToCart = () => {
        setLoading(true);
        addItemToCart(itemId)
            .then(() => message.success(`Successfully add item`))
            .catch((err) => message.error(err.message))
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Tooltip title="Add to shopping cart">
            <Button
                loading={loading}
                type="primary"
                icon={<PlusOutlined />}
                onClick={AddToCart}
            />
        </Tooltip>
    );
};

function FoodList(props) {
    const [restaurants, setRestaurants] = useState([]);
    const [curRest, setCurRest] = useState();
    const [foodData, setFoodData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingRest, setLoadingRest] = useState(false);

    useEffect(() => {
        setLoadingRest(true)
        // fetch restaurants
        getRestaurants()
            .then( res => {
                // console.log(res);
                setRestaurants(res);
            })
            .catch( err => {
                message.error(err.message);
            })
            .finally( () => {
                setLoadingRest(false);
            })
    }, [])

    useEffect(() => {
        console.log(curRest)
        if(curRest) {
            setLoading(true)
            // fetch menu data from the server
            getMenus(curRest)
                .then(data => {
                    // console.log("menu -> ", data)
                    setFoodData(data);
                })
                .catch( err => {
                    message.error(err.message);
                })
                .finally(() => {
                    setLoading(false);
                })
        }
    }, [curRest])

    return (
        <>
            <Select
                value={curRest}
                loading={loadingRest}
                style={{ width: 300 }}
                placeholder="Select a restaurant"
                onSelect={(value) => { setCurRest(value) }}
            >
                {
                    restaurants.map( (item) => {
                        return  <Option
                            value={item.id}
                            key={item.id}
                        >{item.name}</Option>
                    })
                }
            </Select>
            {
                curRest
                &&
                <List
                    style={{ marginTop: 20 }}
                    loading={loading}
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={foodData}
                    renderItem={ item => {
                        return <List.Item>
                            <Card
                                title={item.name}
                                extra={<AddToCartButton itemId={item.id} />}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    style={{ height: 340, width: "100%", display: "block" }}
                                />
                                {`Price: ${item.price}`}
                            </Card>
                        </List.Item>

                    }
                    }
                />
            }
        </>
    );
}

export default FoodList;