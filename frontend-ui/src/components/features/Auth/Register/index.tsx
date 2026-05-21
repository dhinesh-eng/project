import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../../../../services/authService";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        countryCode: "+91",
        phoneNumber: "",
        password: "",
    });

    const [showPassword, setShowPassword] =
        useState(false);

    const [errors, setErrors] = useState<any>({});

    // Validation Function
    const validate = () => {

        let tempErrors: any = {};

        // Username Validation
        const usernameRegex =
            /^[A-Za-z ]+$/;

        if (!formData.username.trim()) {

            tempErrors.username =
                "Username is required";

        } else if (
            formData.username.length < 4
        ) {

            tempErrors.username =
                "Username must be at least 4 characters";

        } else if (
            formData.username.length > 20
        ) {

            tempErrors.username =
                "Username must be less than 20 characters";

        } else if (
            !usernameRegex.test(
                formData.username
            )
        ) {

            tempErrors.username =
                "Username should contain only letters";

        }

        // Email Validation
        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {

            tempErrors.email =
                "Email is required";

        } else if (
            !emailRegex.test(
                formData.email
            )
        ) {

            tempErrors.email =
                "Enter a valid email address";

        }

        // Phone Validation
        const phoneRegex =
            /^[0-9]+$/;

        if (!formData.phoneNumber.trim()) {

            tempErrors.phoneNumber =
                "Phone number is required";

        } else if (
            !phoneRegex.test(
                formData.phoneNumber
            )
        ) {

            tempErrors.phoneNumber =
                "Phone number should contain only digits";

        } else if (
            formData.phoneNumber.length < 10
        ) {

            tempErrors.phoneNumber =
                "Phone number must be at least 10 digits";

        } else if (
            formData.phoneNumber.length > 15
        ) {

            tempErrors.phoneNumber =
                "Phone number must be less than 15 digits";

        }

        // Password Validation
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!formData.password.trim()) {

            tempErrors.password =
                "Password is required";

        } else if (
            !passwordRegex.test(
                formData.password
            )
        ) {

            tempErrors.password =
                "Password must contain uppercase, lowercase, number, special character and minimum 8 characters";

        }

        setErrors(tempErrors);

        return (
            Object.keys(tempErrors).length === 0
        );
    };

    // Handle Input Change
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    // Submit Form
    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            const response = await API.post(
                "/register",
                formData
            );

            console.log(response.data);

            alert(
                "Registration Successful"
            );

            navigate("/");

        } catch (error: any) {

            console.log(error);

            alert(
                error?.response?.data?.message
                || "Registration Failed"
            );

        }

    };

    return (

        <div className="container mt-5">

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            Create Account
                        </h2>

                        <form onSubmit={handleSubmit}>

                            {/* Username */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    className={`form-control ${errors.username
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                    name="username"
                                    maxLength={20}
                                    value={formData.username}
                                    onChange={handleChange}
                                />

                                <div className="invalid-feedback">
                                    {errors.username}
                                </div>

                            </div>

                            {/* Email */}

                            <div className="mb-3">

                                <label className="form-label">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    className={`form-control ${errors.email
                                            ? "is-invalid"
                                            : ""
                                        }`}
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                <div className="invalid-feedback">
                                    {errors.email}
                                </div>

                            </div>

                            {/* Phone Number */}

                            <div className="row">

                                <div className="col-md-4">

                                    <label className="form-label">
                                        Country Code
                                    </label>

                                    <select
                                        className="form-select"
                                        name="countryCode"
                                        value={formData.countryCode}
                                        onChange={handleChange}
                                    >

                                        <option value="+91">
                                            +91
                                        </option>

                                        <option value="+1">
                                            +1
                                        </option>

                                        <option value="+44">
                                            +44
                                        </option>

                                    </select>

                                </div>

                                <div className="col-md-8">

                                    <label className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        className={`form-control ${errors.phoneNumber
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                        name="phoneNumber"
                                        maxLength={15}
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                    />

                                    <div className="invalid-feedback">
                                        {errors.phoneNumber}
                                    </div>

                                </div>

                            </div>

                            {/* Password */}

                            <div className="mb-3 mt-3">

                                <label className="form-label">
                                    Password
                                </label>

                                <div className="input-group">

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        className={`form-control ${errors.password
                                                ? "is-invalid"
                                                : ""
                                            }`}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter Password"
                                    />

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={() =>
                                            setShowPassword(
                                                !showPassword
                                            )
                                        }
                                    >

                                        {showPassword
                                            ? "🙈"
                                            : "👁️"}

                                    </button>

                                </div>

                                <div className="invalid-feedback d-block">
                                    {errors.password}
                                </div>

                            </div>

                            {/* Register Button */}

                            <button
                                className="btn btn-success w-100"
                            >
                                Register
                            </button>

                        </form>

                        <p className="text-center mt-3">

                            Already have account?

                            <Link to="/">
                                {" "}Login
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Register;