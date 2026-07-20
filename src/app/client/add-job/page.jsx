"use client";

import { useState } from "react";
import {
  Input,
  TextArea,
  Select,
  Label,
  ListBox,
  Button,
  Form,
  TextField,
  FieldError,
} from "@heroui/react";
import { FiLayers, FiList, FiPlus, FiX, FiRefreshCw } from "react-icons/fi";
import { toast } from "react-toastify";
import { useClientUserSession } from "@/hooks/useClientUserSession";
import { getClientJWTToken } from "@/lib/getClientJWTToken";
import { FaWandMagicSparkles } from "react-icons/fa6";

export default function PostGigForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    jobType: "",
    budget: "",
    deliveryTime: "",
    coverImage: "",
    address: "",
  });

  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [deliverables, setDeliverables] = useState([]);
  const [currentDeliverable, setCurrentDeliverable] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  // 🎯 AI Requirements Dynamic States
  const [tone, setTone] = useState("professional");
  const [lengthOption, setLengthOption] = useState("medium");
  const [hasGenerated, setHasGenerated] = useState(false);

  const { user } = useClientUserSession();

  const categories = [
    { id: "Frontend", label: "Frontend Development" },
    { id: "Backend", label: "Backend Development" },
    { id: "Full Stack", label: "Full Stack Development" },
    { id: "AI & ML", label: "AI & ML" },
    { id: "Design", label: "Design" },
  ];

  const jobTypes = [
    { id: "Fixed Price", label: "Fixed Price" },
    { id: "Hourly Rate", label: "Hourly Rate" },
  ];

  // AI Prompt Templates Options
  const toneOptions = [
    { id: "professional", label: "Professional Tone" },
    { id: "technical", label: "Technical Tone" },
    { id: "casual", label: "Casual Tone" },
    { id: "urgent", label: "Urgent/High-Priority" },
  ];

  // AI Output Length Options
  const lengthOptions = [
    { id: "short", label: "Short" },
    { id: "medium", label: "Medium" },
    { id: "long", label: "Detailed" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- AI Auto-Generate & Regenerate Handler ---
  const handleAiGenerate = async () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a Gig Title first to generate details!");
      return;
    }

    try {
      setAiLoading(true);
      const toastId = toast.loading(
        hasGenerated
          ? "🔄 GigMind AI is regenerating gig details..."
          : "🤖 GigMind AI is generating gig details...",
      );

      const res = await fetch("/api/generate-job-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          tone: tone,
          length: lengthOption,
        }),
      });

      const result = await res.json();
      toast.dismiss(toastId);

      if (result.success) {
        const {
          description,
          category,
          skills: aiSkills,
          deliverables: aiDeliverables,
        } = result.data;

        // 1. Description & Category Update
        setFormData((prev) => ({
          ...prev,
          description: description || prev.description,
          category: category || prev.category,
        }));

        // 2. Skills Update
        if (aiSkills && Array.isArray(aiSkills) && aiSkills.length > 0) {
          setSkills(aiSkills);
        }

        // 3. Deliverables Update
        if (
          aiDeliverables &&
          Array.isArray(aiDeliverables) &&
          aiDeliverables.length > 0
        ) {
          setDeliverables(aiDeliverables);
        }

        setHasGenerated(true); // Regenerate state active

        toast.success(
          hasGenerated
            ? "✨ Gig details regenerated successfully!"
            : "✨ Gig details auto-filled by AI successfully!",
        );
      } else {
        toast.error(result.error || "Failed to generate AI response.");
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      toast.error("An error occurred while calling GigMind AI.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleAddDeliverable = () => {
    if (currentDeliverable.trim()) {
      setDeliverables([...deliverables, currentDeliverable.trim()]);
      setCurrentDeliverable("");
    }
  };

  const handleRemoveDeliverable = (indexToRemove) => {
    setDeliverables(deliverables.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await getClientJWTToken();

    if (currentSkill.trim() !== "") {
      toast.error(
        "Please click '+ Add' to add your Required Skill before submitting.",
      );
      return;
    }
    if (skills.length === 0) {
      toast.error("Please add at least one Required Skill.");
      return;
    }

    if (currentDeliverable.trim() !== "") {
      toast.error(
        "Please click '+ Add' to add your Key Deliverable before submitting.",
      );
      return;
    }
    if (deliverables.length === 0) {
      toast.error("Please add at least one Key Deliverable.");
      return;
    }

    setLoading(true);

    const finalJobData = {
      ...formData,
      budget: Number(formData.budget),
      skills: skills,
      deliverables: deliverables,
      authorId: user?.id,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(finalJobData),
    });
    const data = await res.json();

    if (data.insertedId) {
      toast.success("🎉 GigMind AI: Custom Gig posted successfully!");
      setLoading(false);

      setFormData({
        title: "",
        description: "",
        category: "",
        jobType: "",
        budget: "",
        deliveryTime: "",
        coverImage: "",
        address: "",
      });
      setSkills([]);
      setDeliverables([]);
      setCurrentSkill("");
      setCurrentDeliverable("");
      setHasGenerated(false);
    } else {
      toast.error(
        data.message || "❌ Failed to post the Custom Gig. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white pt-20 pb-16 relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10 w-full">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-white">
            Post a Custom Gig
          </h1>
          <p className="text-sm text-slate-400">
            Define your requirements and let our AI engine match you with top
            talent.
          </p>
        </div>

        <Form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl flex flex-col gap-8 w-full"
        >
          {/* 1. Job Title with AI Controls Bar */}
          <TextField isRequired className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <Label className="text-white font-medium text-sm block">
                Gig Title
              </Label>

              {/* ✨ GigMind AI Toolbar (Tone, Length & Regenerate) */}
              <div className="flex flex-wrap items-center gap-2">
                {/* 1. Tone / Prompt Template Selection */}
                <Select
                  selectedKey={tone}
                  onSelectionChange={(key) => setTone(String(key))}
                  className="w-36"
                >
                  <Select.Trigger className="bg-gray-800 border border-gray-600 text-white rounded-xl h-8 px-2.5 w-full flex items-center justify-between outline-none cursor-pointer">
                    <Select.Value className="text-xs text-cyan-300 font-medium">
                      {toneOptions.find((t) => t.id === tone)?.label ||
                        "Select Tone"}
                    </Select.Value>
                    <Select.Indicator>
                      <FiLayers className="text-slate-400 size-3 ml-1" />
                    </Select.Indicator>
                  </Select.Trigger>
                  <Select.Popover className="bg-gray-800 border border-gray-600 rounded-xl p-1 shadow-xl z-50">
                    <ListBox>
                      {toneOptions.map((opt) => (
                        <ListBox.Item
                          key={opt.id}
                          id={opt.id}
                          textValue={opt.label}
                          className="text-white hover:bg-white/10 focus:bg-white/10 outline-none rounded-lg p-2 text-xs cursor-pointer block"
                        >
                          {opt.label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* 2. Adjustable Output Length Selection */}
                <Select
                  selectedKey={lengthOption}
                  onSelectionChange={(key) => setLengthOption(String(key))}
                  className="w-28"
                >
                  <Select.Trigger className="bg-gray-800 border border-gray-600 text-white rounded-xl h-8 px-2.5 w-full flex items-center justify-between outline-none cursor-pointer">
                    <Select.Value className="text-xs text-amber-300 font-medium">
                      {lengthOptions.find((l) => l.id === lengthOption)
                        ?.label || "Length"}
                    </Select.Value>
                    <Select.Indicator>
                      <FiList className="text-slate-400 size-3 ml-1" />
                    </Select.Indicator>
                  </Select.Trigger>
                  <Select.Popover className="bg-gray-800 border border-gray-600 rounded-xl p-1 shadow-xl z-50">
                    <ListBox>
                      {lengthOptions.map((opt) => (
                        <ListBox.Item
                          key={opt.id}
                          id={opt.id}
                          textValue={opt.label}
                          className="text-white hover:bg-white/10 focus:bg-white/10 outline-none rounded-lg p-2 text-xs cursor-pointer block"
                        >
                          {opt.label}
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>

                {/* 3. Auto-Fill / Regenerate AI Button */}
                <Button
                  type="button"
                  onPress={handleAiGenerate}
                  isLoading={aiLoading}
                  variant="secondary"
                  className="bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-bold text-xs h-8 px-3 rounded-xl hover:bg-cyan-500/20 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {!aiLoading &&
                    (hasGenerated ? (
                      <FiRefreshCw className="size-3.5 text-cyan-400" />
                    ) : (
                      <FaWandMagicSparkles className="size-3.5 text-amber-400 animate-pulse" />
                    ))}
                  <span>
                    {hasGenerated ? "Regenerate" : "Auto-Fill with AI"}
                  </span>
                </Button>
              </div>
            </div>

            <Input
              className="w-full bg-gray-700 border border-gray-500 placeholder:text-slate-400 text-white rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#00e599] focus:border-transparent"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Full Stack React & Next.js Engineer"
            />
            <FieldError />
          </TextField>

          {/* 2. Detailed Description */}
          <TextField isRequired className="w-full">
            <Label className="text-white font-medium text-sm mb-2 block">
              Project Description
            </Label>
            <TextArea
              className="w-full bg-gray-700 border border-gray-500 placeholder:text-slate-400 text-white rounded-xl h-26 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00e599] focus:border-transparent"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain your project architecture, workflows, and what the AI engine should look for..."
            />
            <FieldError />
          </TextField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* 3. Category Select */}
            <Select
              isRequired
              className="w-full"
              selectedKey={formData.category}
              onSelectionChange={(key) =>
                setFormData((prev) => ({
                  ...prev,
                  category: String(key),
                }))
              }
            >
              <Label className="text-white font-medium text-sm mb-2 block">
                Category
              </Label>
              <Select.Trigger className="bg-gray-700 border border-gray-500 text-white rounded-xl h-12 w-full flex items-center justify-between px-4 outline-none focus:border-white">
                <Select.Value
                  className={
                    formData.category ? "text-white" : "text-slate-400"
                  }
                >
                  {formData.category || "Select Category"}
                </Select.Value>
                <Select.Indicator>
                  <FiLayers className="text-slate-500 size-4" />
                </Select.Indicator>
              </Select.Trigger>
              <Select.Popover className="bg-gray-700 border border-gray-500 rounded-xl p-1 shadow-xl">
                <ListBox>
                  {categories.map((category) => (
                    <ListBox.Item
                      key={category.id}
                      id={category.id}
                      textValue={category.label}
                      className="text-white hover:bg-white/10 focus:bg-white/10 outline-none rounded-lg p-2 text-sm cursor-pointer block data-selected:bg-white/20"
                    >
                      {category.label}
                      <ListBox.ItemIndicator className="text-gray-200" />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
              <FieldError />
            </Select>

            {/* 4. Job Type Select */}
            <Select
              isRequired
              className="w-full"
              selectedKey={formData.jobType}
              onSelectionChange={(key) =>
                setFormData((prev) => ({
                  ...prev,
                  jobType: String(key),
                }))
              }
            >
              <Label className="text-white font-medium text-sm mb-2 block">
                Job Type / Billing
              </Label>
              <Select.Trigger className="bg-gray-700 border border-gray-500 text-white rounded-xl h-12 w-full flex items-center justify-between px-4 outline-none focus:border-white">
                <Select.Value
                  className={formData.jobType ? "text-white" : "text-slate-400"}
                >
                  {formData.jobType || "Select Job Type"}
                </Select.Value>
                <Select.Indicator>
                  <FiList className="text-slate-500 size-4" />
                </Select.Indicator>
              </Select.Trigger>
              <Select.Popover className="bg-gray-700 border border-gray-500 rounded-xl p-1 shadow-xl">
                <ListBox>
                  {jobTypes.map((job) => (
                    <ListBox.Item
                      key={job.id}
                      id={job.id}
                      textValue={job.label}
                      className="text-white hover:bg-white/10 focus:bg-white/10 outline-none rounded-lg p-2 text-sm cursor-pointer block data-selected:bg-white/20"
                    >
                      {job.label}
                      <ListBox.ItemIndicator className="text-gray-200" />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
              <FieldError />
            </Select>

            {/* 5. Budget */}
            <TextField isRequired className="w-full">
              <Label className="text-white font-medium text-sm mb-2 block">
                Budget / Price ($)
              </Label>
              <Input
                className="w-full bg-gray-700 border border-gray-500 placeholder:text-slate-400 text-white rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#00e599] focus:border-transparent"
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g., 2500"
              />
              <FieldError />
            </TextField>

            {/* 6. Delivery Time */}
            <TextField isRequired className="w-full">
              <Label className="text-white font-medium text-sm mb-2 block">
                Delivery Time
              </Label>
              <Input
                className="w-full bg-gray-700 border border-gray-500 placeholder:text-slate-400 text-white rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#00e599] focus:border-transparent"
                type="text"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                placeholder="e.g., 14 Days"
              />
              <FieldError />
            </TextField>

            {/* 7. Cover Image URL */}
            <TextField isRequired className="w-full md:col-span-2">
              <Label className="text-white font-medium text-sm mb-2 block">
                Cover Image URL
              </Label>
              <Input
                className="w-full bg-gray-700 border border-gray-500 placeholder:text-slate-400 text-white rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#00e599] focus:border-transparent"
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/your-card-banner.jpg"
              />
              <FieldError />
            </TextField>

            {/* 7.6 Address Input Field */}
            <TextField isRequired className="w-full md:col-span-2">
              <Label className="text-white font-medium text-sm mb-2 block">
                Office / Corporate Address
              </Label>
              <Input
                className="w-full bg-gray-700 border border-gray-500 placeholder:text-slate-400 text-white rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#00e599] focus:border-transparent"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="e.g., Bhaluka, Mymensingh, Bangladesh"
              />
              <FieldError />
            </TextField>
          </div>

          {/* 8. Required Skills & Technologies */}
          <TextField className="w-full">
            <Label className="text-white font-medium text-sm mb-2 block">
              Required Skills & Technologies{" "}
              <span className="text-danger">*</span>
            </Label>
            <div className="flex gap-2 w-full">
              <Input
                className="w-full bg-gray-700 border border-gray-500 placeholder:text-slate-400 text-white rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#00e599] focus:border-transparent"
                type="text"
                placeholder="Type a skill (e.g., React) and click Add"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
              />
              <Button
                type="button"
                onPress={handleAddSkill}
                variant="secondary"
                className="bg-[#00e599] text-[#0a0f1d] font-bold h-12 px-6 rounded-xl hover:scale-105 transition-transform"
              >
                <FiPlus className="size-4" /> Add
              </Button>
            </div>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-red-400 hover:text-red-500 cursor-pointer"
                    >
                      <FiX className="size-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <FieldError />
          </TextField>

          {/* 9. Key Deliverables */}
          <TextField className="w-full">
            <Label className="text-white font-medium text-sm mb-2 block">
              Key Deliverables <span className="text-danger">*</span>
            </Label>
            <div className="flex gap-2 w-full">
              <Input
                className="w-full bg-gray-700 border border-gray-500 placeholder:text-slate-400 text-white rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#00e599] focus:border-transparent"
                type="text"
                placeholder="e.g., Complete API Documentation"
                value={currentDeliverable}
                onChange={(e) => setCurrentDeliverable(e.target.value)}
              />
              <Button
                type="button"
                onPress={handleAddDeliverable}
                variant="secondary"
                className="bg-[#00e599] text-[#0a0f1d] font-bold h-12 px-6 rounded-xl hover:scale-105 transition-transform"
              >
                <FiPlus className="size-4" /> Add
              </Button>
            </div>
            {deliverables.length > 0 && (
              <ul className="space-y-2 pl-1 mt-3">
                {deliverables.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start justify-between gap-4 p-2.5 bg-white/5 border border-white/10 rounded-xl text-xs md:text-sm text-white"
                  >
                    <span className="flex items-start gap-2">
                      <span className="text-[#00e599] font-bold mt-0.5">•</span>
                      {item}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDeliverable(index)}
                      className="text-red-400 hover:text-red-500 shrink-0 cursor-pointer"
                    >
                      <FiX className="size-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <FieldError />
          </TextField>

          {/* Submit Button */}
          <div className="pt-2 w-full">
            <Button
              isLoading={loading}
              type="submit"
              variant="secondary"
              className="w-full bg-[#00e599] text-[#0a0f1d] font-black tracking-wide h-12 text-sm md:text-base rounded-xl shadow-lg transition-all hover:bg-[#00c985] cursor-pointer"
            >
              {loading ? "Matching AI Talents..." : "Post Custom Gig"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
