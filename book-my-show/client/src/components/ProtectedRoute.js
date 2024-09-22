import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined, UserOutlined, ProfileOutlined, LogoutOutlined } from "@ant-design/icons"
import { hideLoading, showLoading } from '../redux/loaderSlice';
import { GetCurrentUser } from '../api/users';
import { setUser } from '../redux/userSlice';
import { Layout, Menu, message } from 'antd';
import bookMyShowLogo from "../assets/book-my-show-logo-2.svg"

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log(user)

    const navItems = [
        {
            key: "home",
            label: "Home",
            icon: <HomeOutlined />,
        },
        {
            key: "user",
            label: `${user ? user.name : ""}`,
            icon: <UserOutlined />,
            children: [
                {
                    key: "myProfile",
                    label: (
                        <span
                            onClick={() => {
                                if (user.role === "admin") {
                                    navigate("/admin");
                                } else if (user.role === "partner") {
                                    navigate("/partner");
                                } else {
                                    navigate("/profile");
                                }
                            }}
                        >
                            My Profile
                        </span>
                    ),
                    icon: <ProfileOutlined />,
                },
                {
                    key: "logout",
                    label: (
                        <Link
                            to="/login"
                            onClick={() => {
                                localStorage.removeItem("token");
                            }}
                        >
                            Logout
                        </Link>
                    ),
                    icon: <LogoutOutlined />,
                },
            ],
        },
    ];

    useEffect(() => {
        const getValidUser = async () => {
            try {
                dispatch(showLoading());
                const response = await GetCurrentUser();
                console.log(response);
                dispatch(setUser(response.data));
                dispatch(hideLoading());
            } catch (error) {
                console.log(error);
                dispatch(hideLoading());
                message.error(error.message);
            }
        }

        if (localStorage.getItem("auth_token")) {
            getValidUser();
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { Header, Footer, Sider, Content } = Layout;

    return (
        user && (
            <>
                <Layout>
                    <Header
                        style={{
                            position: "sticky",
                            top: 0,
                            zIdnex: 1,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        {/* <h3 className="text-white m-0" style={{ color: "black" }}>Book My Show</h3> */}
                        <span
                            style={{
                                display: "flex",
                            }}
                        ><img src={bookMyShowLogo} alt="book-my-show-logo" /></span>
                        <Menu items={navItems} mode="horizontal" theme="dark" />
                    </Header>
                    <div style={{ padding: 4, minHeight: "380px", background: "#fff" }}>{children}</div>
                </Layout>
            </>
        )
    )
}

export default ProtectedRoute