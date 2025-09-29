import { useState } from "react";

const BookAppointment = () => {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        termsAccepted: false
    });

    const [errors, setErrors] = useState({
        name: "",
        phone: "",
        terms: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            name: "",
            phone: "",
            terms: ""
        };

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = "Please enter a valid 10-digit phone number";
        }

        if (!formData.termsAccepted) {
            newErrors.terms = "You must accept the terms and conditions";
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // Handle form submission here
            console.log("Form submitted:", formData);
            alert("Thank you! We will contact you soon to confirm your appointment.");

            // Reset form
            setFormData({
                name: "",
                phone: "",
                termsAccepted: false
            });
        }
    };

    return (
        <div className="book-appointment">
            <div className="book-appointment__header">
                <h3>Book Appointment</h3>
                <p>Schedule your consultation with our experts</p>
            </div>

            <form onSubmit={handleSubmit} className="book-appointment__form">
                <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className={errors.name ? "error" : ""}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className={errors.phone ? "error" : ""}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group terms-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleInputChange}
                        />
                        <span className="checkmark"></span>
                        <span className="terms-text">
                            By clicking on Book Appointment, you authorize <strong>venfurneer</strong> to contact you via email, SMS, RCS or any other channel even if registered under DND/NDNC and agree to receive important communications via WhatsApp.
                        </span>
                    </label>
                    {errors.terms && <span className="error-message">{errors.terms}</span>}
                </div>

                <button type="submit" className="book-appointment__btn">
                    Book Appointment
                </button>
            </form>


        </div>
    );
};

export default BookAppointment;
