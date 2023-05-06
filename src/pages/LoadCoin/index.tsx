import axiosInstance from "@/config/axios";
import { Button, Form, Input } from "antd";

function LoadCoin() {

    const handleSubmit = async (field: any) => {
        try {
          const response = await axiosInstance.get('/user/v1/load-coin?coin=' + field.coin);
          window.location.replace(response.data);
        } catch (error) {
          console.log('Error:', error);
        }
      };
    
    return ( 
        <Form onFinish={handleSubmit}>
            <Form.Item label="So tien nap" name="coin">
                <Input type="number"></Input>
            </Form.Item>
            <Form.Item >
                <Button htmlType="submit" type="primary">Xac nhan</Button>
            </Form.Item>
        </Form>
     );
}

export default LoadCoin;