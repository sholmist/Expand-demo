import { Button, Form, Input, InputNumber, notification, Select } from "antd";
import { Content } from "antd/lib/layout/layout";
import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import agent from "../actions/agent";
import { Category } from "../models/category";
import { RegisterCourse } from "../models/course";
import { categoriesSelector } from "../redux/slice/categorySlice";
import { useAppSelector } from "../redux/store/configureStore";

const CreateCourse = () => {
  const [values, setValues] = useState<RegisterCourse>({
    title: "",
    subtitle: "",
    description: "",
    price: 0,
    categoryId: 0,
    level: "",
    language: "",
  });

  const { title, subtitle, description, price, categoryId, level, language } =
    values;

  const categories = useAppSelector(categoriesSelector.selectAll);

  const { Option } = Select;
  const history = useHistory();

  const getSelectCategories = () => {
    const catArray: { value: number; label: string }[] = [];

    if (categories) {
      categories.forEach((category: Category) => {
        catArray.push({ value: category.id, label: category.name });
      });
    }
    return catArray;
  };

  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async () => {
    const response = await agent.Courses.create(values);
    notification.success({
      message: response,
    });
    history.push("/instructor");
  };

  return (
    <Content style={{ padding: "50px" }}>
      <h1>Create Course</h1>
      <Form {...formItemLayout} form={form} name="course" onFinish={onSubmit}>
        <Form.Item
          name="title"
          label="Course Title"
          rules={[
            {
              min: 10,
              message: "Title Should have at least 10 characters",
            },
            {
              required: true,
              message: "Please mention the title of the course",
            },
          ]}
        >
          <Input onChange={handleChange} name="title" value={title} />
        </Form.Item>
        <Form.Item
          name="subtitle"
          label="Course Subtitle"
          rules={[
            {
              min: 10,
              message: "SubTitle Should have at least 10 characters",
            },
            {
              required: true,
              message: "Please mention the subtitle of the course",
            },
          ]}
        >
          <Input onChange={handleChange} name="subtitle" value={subtitle} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Course Description"
          rules={[
            {
              min: 10,
              message: "Description Should have at least 10 characters",
            },
            {
              required: true,
              message: "Please mention the description of the course",
            },
          ]}
        >
          <Input.TextArea
            onChange={handleChange}
            name="description"
            value={description}
          />
        </Form.Item>
        <Form.Item
          name="price"
          label="Course Price"
          rules={[
            {
              required: true,
              message: "Please mention the price of the course",
            },
          ]}
        >
          <InputNumber
            name="price"
            placeholder="Course Price"
            value={price}
            onChange={(value) =>
              setValues({
                ...values,
                price: value,
              })
            }
          />
        </Form.Item>
        <Form.Item
          name="category"
          label="Course Category"
          rules={[
            {
              required: true,
              message: "Please mention the category of the course",
            },
          ]}
        >
          <Select
            options={getSelectCategories()}
            value={categoryId}
            placeholder="Select the Category"
            onChange={(value) => setValues({ ...values, categoryId: value })}
          />
        </Form.Item>
        <Form.Item
          name="level"
          label="Course Level"
          rules={[
            {
              required: true,
              message: "Please choose a level",
            },
          ]}
        >
          <Select
            value={level}
            placeholder="Choose a Level"
            onChange={(value) => setValues({ ...values, level: value })}
          >
            <Option value="Beginner">Beginner</Option>
            <Option value="Intermediate">Intermediate</Option>
            <Option value="Advanced">Advanced</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="language"
          label="Course Language"
          rules={[
            {
              required: true,
              message: "Please choose a language",
            },
          ]}
        >
          <Select
            value={language}
            placeholder="Choose a Language"
            onChange={(value) => setValues({ ...values, language: value })}
          >
            <Option value="English">English</Option>
            <Option value="Spanish">Spanish</Option>
            <Option value="Hindi">Hindi</Option>
            <Option value="Japanese">Japanese</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default CreateCourse;
