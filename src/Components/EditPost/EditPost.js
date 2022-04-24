import React, {useState, useEffect} from 'react'
import {useLocation} from "react-router-dom";
import {Button, Form, Input, Spin} from "antd";
import api from "../../utils/api";

export const EditPost = () => {

    const url = useLocation().pathname.split("/").pop()
    const [post, setPost] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        Promise.all([api.getPostOfId(url)])
            .then(post => {
                setPost(...post)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return <Spin style={{marginTop: 30}}/>
    }


    return (
        <Form
            name="editPost"
            labelCol={{span: 4}}
            wrapperCol={{span: 16}}
            autoComplete="off"
        >
            <Form.Item
                label="Заголовок"
                name="title"
                initialValue={post.title}
                rules={[{required: true, message: 'Please input post title!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Text"
                name="text"
                initialValue={post.text}
                rules={[{required: true, message: 'Please input your post Text!'}]}
            >
                <Input.TextArea/>
            </Form.Item>

            <Form.Item
                label="Тэги"
                name="tags"
                initialValue={post.tags}
            >
                <Input/>
            </Form.Item>


            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form.Item>
        </Form>
    )
}