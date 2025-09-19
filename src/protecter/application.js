// src/components/ApplicationForm.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // 用于重定向（如果未登录）
import { AuthContext } from "../AuthContext"; // 您的 AuthContext 文件路径
import { BACKEND } from "../consts"; // 保持原有常量
import { supabase } from "../supabaseClient"; // 导入 supabase 以集成认证（如果需要）

const ApplicationForm = () => {
  const { session, userLevel, loading } = useContext(AuthContext); // 从 Context 获取 session、userLevel 和 loading
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: initialEmail,
    purpose: "",
    disclaimerAgreed: false,
  });

  // 处理加载状态
  if (loading) {
    return (
      <div className="application-form-container">
        <h2>加载中... (Loading...)</h2>
        <p>正在获取用户认证信息，请稍候。</p>
      </div>
    );
  }

  // 如果未登录，重定向到登录页
  if (!session) {
    navigate("/login"); // 假设登录路由为 /login
    return null; // 防止渲染表单
  }

  // 预填充 email 从 session（如果可用）
  const initialEmail = session.user?.email || "";

  // 根据 userLevel 显示不同内容（例如，如果 userLevel >= 5，已有访问权限，无需申请）
  // 注意：阈值 5 是假设值，根据您的实际实现调整（例如，如果 passcode 需要 level >=5）
  if (userLevel >= 5) {
    return (
      <div className="application-form-container">
        <h2>Application Form</h2>
        <p>
          您的用户级别 (User Level) 已达到 {userLevel}，无需申请
          passcode。您已有访问权限。
        </p>
        <button onClick={() => navigate("/")} className="back-button">
          返回主页 (Back to Home)
        </button>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    if (!formData.disclaimerAgreed) {
      setMessage("You must agree to the disclaimer.");
      return;
    }
    if (!formData.name || !formData.email || !formData.purpose) {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      // 添加认证头，使用 Supabase session 的 access_token（与您的 AuthContext 兼容）
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`, // 集成 Supabase 认证，确保后端验证
      };

      // 在提交数据中包含 user_id 和当前 userLevel（供后端处理申请和更新 user_levels 表）
      const submitData = {
        ...formData,
        user_id: session.user.id, // 从 session 获取 user_id，与您的 AuthContext 兼容
        current_user_level: userLevel, // 包含当前级别，便于后端审核
      };

      const response = await fetch(BACKEND + "/api/applications", {
        method: "POST",
        headers,
        body: JSON.stringify(submitData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setMessage(
        "Application submitted successfully! We will review and update your user level if approved."
      );
      setIsSuccess(true);
      setFormData({
        name: "",
        email: initialEmail,
        purpose: "",
        disclaimerAgreed: false,
      });

      // 可选：提交后手动刷新 userLevel（如果后端立即更新；否则依赖 onAuthStateChange）
      // const { data } = await supabase.from("user_levels").select("level").eq("user_id", session.user.id).single();
      // if (data) setUserLevel(data.level); // 但通常后端异步批准，不需立即刷新
    } catch (error) {
      setMessage("Error submitting application: " + error.message);
      setIsSuccess(false);
    }
  };

  return (
    <div className="application-form-container">
      <h2>Application Form for Passcode</h2>
      <p>
        当前用户级别 (Current User Level): {userLevel}. 申请 passcode
        以提升访问权限。
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="purpose">Purpose of using data:</label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </div>
        <div className="form-group checkbox-group">
          <input
            id="disclaimer"
            type="checkbox"
            name="disclaimerAgreed"
            checked={formData.disclaimerAgreed}
            onChange={handleChange}
            className="form-checkbox"
          />
          <label htmlFor="disclaimer">
            I agree to the disclaimer: Data will be used responsibly, and I take
            full responsibility for its usage.
          </label>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {message && (
        <p className={isSuccess ? "success-message" : "error-message"}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ApplicationForm;
