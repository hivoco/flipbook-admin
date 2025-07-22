"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from "recharts";

import {
  Calendar,
  Users,
  Clock,
  FileText,
  MousePointer,
  Globe,
  Star,
  TrendingUp,
  Activity,
  Target,
  MapPin,
  Download,
  Eye,
  UserCheck,
  ArrowLeft,
  Filter,
} from "lucide-react";
import { BASE_URL } from "../../../../constant";
import { useTime } from "framer-motion";
import { useRouter } from "next/router";
import { useSelectedLayoutSegment } from "next/navigation";

const FlipbookAnalyticsDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [selectedDateRange, setSelectedDateRange] = useState({
    start: "",
    end: "",
  })

  const [sessionData, setSessionData] = useState([]);
  const [visitorsData, setVisitorsData] = useState([]);
  const [engagementData, setEngagementData] = useState(null);
  const [visitorTrends, setVisitorTrends] = useState(null);
  const [pagesAnalytics, setPagesAnalytics] = useState(null);
  const [mostClickedButtons, setMostClickedButtons] = useState(null);
  const [geographyInfo, setGeographyInfo] = useState(null);
  const [sources, setSources] = useState(null);
  const colorArray = [
    "#4F46E5", // Indigo
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#3B82F6", // Blue
    "#8B5CF6", // Violet
    "#EC4899", // Pink
    "#22D3EE", // Cyan
  ];

  const [flipbookId] = useState("brochure_1");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const [flipbookName, setFlipbookName] = useState("");

  const router = useRouter();
  console.log(flipbookName);

  useEffect(() => {
    if (router.isReady && router.asPath) {
      setFlipbookName(router.asPath.split("/").pop());
    }
  }, [router.isReady, router.asPath]);

  // async function getData() {
  //   const response = await fetch("getData/route1");
  //   const data = await response.json();
  //   SetData(data);
  // }

  // Enhanced mock data
  const [dashboardData, setDashboardData] = useState({
    summary: {
      dailyVisitors: 298,
      weeklyVisitors: 1896,
      monthlyVisitors: 8347,
      totalVisitors: 28479,
      activeUsers: 23,
      avgSessionDuration: 245, // seconds
      avgPagesViewed: 8.5,
      completionRate: 67.8,
      leadSubmissions: 156,
      feedbackScore: 4.2,
      bounceRate: 24.3,
      returnVisitorRate: 43.7,
      avgTimeOnPage: 52, // seconds
    },
    dailyVisitors: [
      { date: "2025-06-22", visitors: 145, newVisitors: 89, returning: 56 },
      { date: "2025-06-23", visitors: 198, newVisitors: 112, returning: 86 },
      { date: "2025-06-24", visitors: 176, newVisitors: 95, returning: 81 },
      { date: "2025-06-25", visitors: 223, newVisitors: 134, returning: 89 },
      { date: "2025-06-26", visitors: 189, newVisitors: 101, returning: 88 },
      { date: "2025-06-27", visitors: 267, newVisitors: 156, returning: 111 },
      { date: "2025-06-28", visitors: 298, newVisitors: 178, returning: 120 },
    ],
    weeklyVisitors: [
      { week: "Week 1", visitors: 1245, newVisitors: 789 },
      { week: "Week 2", visitors: 1567, newVisitors: 892 },
      { week: "Week 3", visitors: 1789, newVisitors: 967 },
      { week: "Week 4", visitors: 1896, newVisitors: 1034 },
    ],
    monthlyVisitors: [
      { month: "Jan", visitors: 5234, newVisitors: 3456 },
      { month: "Feb", visitors: 6123, newVisitors: 3789 },
      { month: "Mar", visitors: 7456, newVisitors: 4234 },
      { month: "Apr", visitors: 8347, newVisitors: 4567 },
      { month: "May", visitors: 7923, newVisitors: 4123 },
      { month: "Jun", visitors: 8456, newVisitors: 4789 },
    ],
    sourceData: [
      { name: "WhatsApp", value: 35.2, visitors: 2834, color: "#25D366" },
      { name: "Email", value: 28.6, visitors: 2301, color: "#EA4335" },
      { name: "Website", value: 18.7, visitors: 1505, color: "#4285F4" },
      { name: "QR Code", value: 12.1, visitors: 973, color: "#9333EA" },
      { name: "Social Media", value: 5.4, visitors: 434, color: "#F59E0B" },
    ],
    timeOfDayData: [
      { hour: "00", sessions: 12 },
      { hour: "01", sessions: 8 },
      { hour: "02", sessions: 5 },
      { hour: "03", sessions: 4 },
      { hour: "04", sessions: 7 },
      { hour: "05", sessions: 15 },
      { hour: "06", sessions: 28 },
      { hour: "07", sessions: 45 },
      { hour: "08", sessions: 67 },
      { hour: "09", sessions: 89 },
      { hour: "10", sessions: 112 },
      { hour: "11", sessions: 134 },
      { hour: "12", sessions: 156 },
      { hour: "13", sessions: 143 },
      { hour: "14", sessions: 167 },
      { hour: "15", sessions: 189 },
      { hour: "16", sessions: 201 },
      { hour: "17", sessions: 178 },
      { hour: "18", sessions: 165 },
      { hour: "19", sessions: 145 },
      { hour: "20", sessions: 123 },
      { hour: "21", sessions: 98 },
      { hour: "22", sessions: 67 },
      { hour: "23", sessions: 34 },
    ],
    weekdayData: [
      { day: "Monday", sessions: 567, completion: 72 },
      { day: "Tuesday", sessions: 623, completion: 68 },
      { day: "Wednesday", sessions: 689, completion: 71 },
      { day: "Thursday", sessions: 734, completion: 69 },
      { day: "Friday", sessions: 812, completion: 74 },
      { day: "Saturday", sessions: 456, completion: 65 },
      { day: "Sunday", sessions: 389, completion: 63 },
    ],
    cityData: [
      { city: "Mumbai", visitors: 3456, size: 100 },
      { city: "Delhi", visitors: 2834, size: 85 },
      { city: "Bangalore", visitors: 2245, size: 70 },
      { city: "Hyderabad", visitors: 1567, size: 55 },
      { city: "Chennai", visitors: 1234, size: 45 },
      { city: "Pune", visitors: 1089, size: 40 },
      { city: "Kolkata", visitors: 967, size: 35 },
      { city: "Ahmedabad", visitors: 834, size: 30 },
      { city: "Jaipur", visitors: 723, size: 25 },
      { city: "Surat", visitors: 645, size: 22 },
      { city: "Lucknow", visitors: 567, size: 20 },
      { city: "Kanpur", visitors: 456, size: 18 },
      { city: "Nagpur", visitors: 389, size: 16 },
      { city: "Indore", visitors: 334, size: 14 },
      { city: "Bhopal", visitors: 289, size: 12 },
    ],
    mostVisitedPages: [
      { page: 1, views: 8347, avgTime: 45, bounceRate: 15.2 },
      { page: 2, views: 7234, avgTime: 38, bounceRate: 18.7 },
      { page: 3, views: 6567, avgTime: 42, bounceRate: 22.1 },
      { page: 4, views: 5745, avgTime: 35, bounceRate: 28.4 },
      { page: 5, views: 4923, avgTime: 41, bounceRate: 32.7 },
    ],
    mostClickedButtons: [
      { buttonId: "contact-us", clicks: 1456, page: 8, conversionRate: 12.5 },
      {
        buttonId: "download-pdf",
        clicks: 1342,
        page: 12,
        conversionRate: 18.3,
      },
      { buttonId: "learn-more", clicks: 1189, page: 5, conversionRate: 8.7 },
      { buttonId: "get-quote", clicks: 934, page: 15, conversionRate: 22.1 },
      { buttonId: "watch-video", clicks: 787, page: 3, conversionRate: 15.6 },
    ],
    deviceData: [
      { device: "Mobile", visitors: 4523, percentage: 58.2 },
      { device: "Desktop", visitors: 2456, percentage: 31.6 },
      { device: "Tablet", visitors: 789, percentage: 10.2 },
    ],
    sessionDurationTrends: [
      { date: "2025-06-22", avgDuration: 235 },
      { date: "2025-06-23", avgDuration: 242 },
      { date: "2025-06-24", avgDuration: 238 },
      { date: "2025-06-25", avgDuration: 251 },
      { date: "2025-06-26", avgDuration: 245 },
      { date: "2025-06-27", avgDuration: 258 },
      { date: "2025-06-28", avgDuration: 267 },
    ],
  });

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);

    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000)?.toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000)?.toFixed(1) + "k";
    }
    return num?.toString();
  };

  // Generate different data based on selected period
  const getFilteredData = () => {
    const baseData = dashboardData.summary;

    switch (selectedPeriod) {
      case "24h":
        return {
          ...baseData,
          dailyVisitors: 298,
          weeklyVisitors: 1896,
          monthlyVisitors: 8347,
          avgSessionDuration: 267,
          completionRate: 71.2,
          bounceRate: 22.1,
          returnVisitorRate: 45.3,
        };
      case "7d":
        return {
          ...baseData,
          dailyVisitors: 1896,
          weeklyVisitors: 1896,
          monthlyVisitors: 8347,
          avgSessionDuration: 245,
          completionRate: 67.8,
          bounceRate: 24.3,
          returnVisitorRate: 43.7,
        };
      case "30d":
        return {
          ...baseData,
          dailyVisitors: 8347,
          weeklyVisitors: 7623,
          monthlyVisitors: 8347,
          avgSessionDuration: 228,
          completionRate: 64.5,
          bounceRate: 26.8,
          returnVisitorRate: 41.2,
        };
      case "90d":
        return {
          ...baseData,
          dailyVisitors: 24567,
          weeklyVisitors: 22345,
          monthlyVisitors: 24567,
          avgSessionDuration: 215,
          completionRate: 62.1,
          bounceRate: 29.5,
          returnVisitorRate: 38.9,
        };
      default:
        return baseData;
    }
  };

  const getVisitorChartData = () => {
    switch (selectedPeriod) {
      case "24h":
        return [
          { date: "00:00", visitors: 12, newVisitors: 8 },
          { date: "06:00", visitors: 28, newVisitors: 18 },
          { date: "12:00", visitors: 156, newVisitors: 89 },
          { date: "18:00", visitors: 102, newVisitors: 67 },
        ];
      case "7d":
        return dashboardData.dailyVisitors;
      case "30d":
        return dashboardData.weeklyVisitors.map((w) => ({
          date: w.week,
          visitors: w.visitors,
          newVisitors: w.newVisitors,
        }));
      case "90d":
        return dashboardData.monthlyVisitors.map((m) => ({
          date: m.month,
          visitors: m.visitors,
          newVisitors: m.newVisitors,
        }));
      default:
        return dashboardData.dailyVisitors;
    }
  };

  const currentData = getFilteredData();

  const getSessionData = async () => {
    try {
      const res = await fetch(
        BASE_URL + "/user/session-stats?flipbookId=" + flipbookName
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      console.log(data);
      setSessionData(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const getVisitorData = async () => {
    try {
      const res = await fetch(
        "http://localhost:8831/user/visitors?flipbookId=" + flipbookName
      );
      const data = await res.json();
      setVisitorsData(data);
    } catch (err) {
      console.error("Error fetching visitor data:", err);
    }
  };

  const getEngagementData = async () => {
    try {
      const res = await fetch(
        "http://localhost:8831/user/engagement?flipbookId=" + flipbookName
      );
      const data = await res.json();
      setEngagementData(data);
    } catch (err) {
      console.error("Error fetching engagement data:", err);
    }
  };

  const getVisitorTrends = async () => {
    try {
      const res = await fetch(
        "http://localhost:8831/user/visitors/trends?flipbookId=" + flipbookName
      );
      const data = await res.json();
      setVisitorTrends(data);
      console.log(data);
    } catch (err) {
      console.error("Error fetching visitor trends:", err);
    }
  };

  const getMostVisitedPages = async () => {
    try {
      const res = await fetch(
        BASE_URL +
          "/user/behavior/most-visited-pages?flipbookId=" +
          flipbookName
      );
      const data = await res.json();
      setPagesAnalytics(data);
    } catch (err) {
      console.error("Error fetching time spent on pages:", err);
    }
  };

  const getMostClickedButtons = async () => {
    try {
      const res = await fetch(
        BASE_URL + "/user/behavior/most-button-click?flipbookId=" + flipbookName
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setMostClickedButtons(data);
      console.log(data);
    } catch (err) {
      console.error("Error fetching most clicked buttons:", err);
    }
  };

  const fetchSourceInfo = async () => {
    try {
      const res = await fetch(
        BASE_URL + "/user/sources/info?flipbookId=" + flipbookName
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setSources(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchGeographyInfo = async () => {
    try {
      const res = await fetch(
        "http://localhost:8831/user/geography/info?flipbookId=" + flipbookName
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setGeographyInfo(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        await Promise.all([
          getSessionData(),
          getVisitorData(),
          getEngagementData(),
          getVisitorTrends(),
          getMostVisitedPages(),
          getMostClickedButtons(),
          fetchSourceInfo(),
          fetchGeographyInfo(),
        ]);
      } catch (err) {
        console.error("Data fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (flipbookName) {
      fetchAllData();
    }
  }, [flipbookName]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Flipbook Analytics
              </h1>
              {/* <p className="text-gray-600">
                Product Catalog 2025 - Comprehensive Analytics Dashboard
              </p> */}
            </div>
            <div className="flex items-center space-x-4">
              {/* Live indicator */}
              {/* <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">
                  Live Data - Updates every {selectedPeriod}
                </span>
              </div> */}

              {/* Custom Date Range */}
              {/* <div className="flex items-center space-x-2">
                <input
                  type="date"
                  value={selectedDateRange.start}
                  onChange={(e) =>
                    setSelectedDateRange((prev) => ({
                      ...prev,
                      start: e.target.value,
                    }))
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  value={selectedDateRange.end}
                  onChange={(e) =>
                    setSelectedDateRange((prev) => ({
                      ...prev,
                      end: e.target.value,
                    }))
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                <button
                  onClick={() =>
                    console.log("Apply custom date range:", selectedDateRange)
                  }
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                >
                  Apply
                </button>
              </div> */}

              {/* Period Buttons */}
              {/* <div className="flex space-x-2">
                {["24h", "7d", "30d", "90d"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedPeriod === period
                        ? "bg-blue-600 text-white shadow-lg transform scale-105"
                        : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-300"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "overview", name: "Overview", icon: Activity },
                { id: "visitors", name: "Visitors", icon: Users },
                { id: "behavior", name: "Behavior", icon: MousePointer },
                { id: "sources", name: "Sources", icon: Globe },
                { id: "geography", name: "Geography", icon: MapPin },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Daily Visitors
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatNumber(visitorsData?.daily?.today)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    {visitorsData?.daily?.change} from yesterday
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Weekly Visitors
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatNumber(visitorsData?.weekly?.thisWeek)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    {visitorsData.weekly.change} from yesterday from last week
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Monthly Visitors
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {formatNumber(visitorsData.monthly.thisMonth)}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Activity className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">
                    {visitorsData.monthly.change} from last month
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Active Users
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {engagementData?.activeUsers}
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-sm text-gray-500">
                    Currently online
                  </span>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {sessionData.avgSessionDuration}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Session Duration
                </p>
                <p className="text-xs text-gray-500 mt-1">Per user session</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {sessionData.avgPagesPerSession}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Avg Pages per Session
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Pages viewed per visit
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {engagementData?.completionRate}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Completion Rate
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${engagementData?.completionRate} ` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {engagementData?.newUsers}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600">New user</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${engagementData?.newUserPercentage} ` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {engagementData?.returningUsers}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Returned user
                </p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{
                      width: `${engagementData?.returnUserPercentage} `,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Download className="h-5 w-5 text-orange-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {dashboardData.summary.leadSubmissions}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-600">
                  Lead Submissions
                </p>
                <p className="text-xs text-gray-500 mt-1">Form captures</p>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    User Feedback
                  </h3>
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {dashboardData.summary.feedbackScore}
                  </span>
                  <div className="ml-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-6 w-6 ${
                          star <=
                          Math.round(dashboardData.summary.feedbackScore)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Average user rating
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Bounce Rate
                  </h3>
                  <ArrowLeft className="h-5 w-5 text-red-500" />
                </div>
                <div className="text-center">
                  <span className="text-4xl font-bold text-gray-900">
                    {currentData.bounceRate}%
                  </span>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-red-500 h-3 rounded-full"
                      style={{ width: `${currentData.bounceRate}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Single page visits
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Return Visitors
                  </h3>
                  <UserCheck className="h-5 w-5 text-green-500" />
                </div>
                <div className="text-center">
                  <span className="text-4xl font-bold text-gray-900">
                    {engagementData?.returnUserPercentage}
                  </span>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-green-500 h-3 rounded-full"
                      style={{
                        width: `${engagementData?.returnUserPercentage}`,
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Returning users</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Visitors Tab */}
        {activeTab === "visitors" && (
          <>
            {/* Visitor Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Daily Visitor Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={visitorTrends?.dailyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="hour" stroke="#6b7280" fontSize={12} />

                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#3B82F6"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div> */}

              {/* <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Session Duration Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={dashboardData.sessionDurationTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip
                      formatter={(value) => [
                        formatDuration(value),
                        "Avg Duration",
                      ]}
                    />
                    <Area
                      type="monotone"
                      dataKey="avgDuration"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div> */}
            </div>

            {/* Weekly and Monthly Views */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Weekly Visitors
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={visitorTrends?.weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Monthly Visitors
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={visitorTrends?.weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Behavior Tab */}
        {activeTab === "behavior" && (
          <>
            {/* Time Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Hourly Activity
                </h3>

                {Object.entries(visitorTrends?.dailyTrend).length === 0 ? (
                  <p>No data</p>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={visitorTrends?.dailyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="hour" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip />
                      <Bar
                        dataKey="sessions"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Weekday Analysis
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dashboardData.weekdayData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
                    <YAxis stroke="#6b7280" fontSize={12} />
                    <Tooltip />
                    <Bar
                      dataKey="sessions"
                      fill="#10B981"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Page and Button Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Most Visited Pages
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {/* {dashboardData.mostVisitedPages.map((page, index) => (
                      <div
                        key={page.page}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                            {page.page}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Page {page.page}
                            </p>
                            <p className="text-xs text-gray-500">
                              Avg time: {page.avgTime}s | Bounce:{" "}
                              {page.bounceRate}%
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {formatNumber(page.views)}
                          </p>
                          <p className="text-xs text-gray-500">views</p>
                        </div>
                      </div>
                    ))} */}

                    {Object.entries(pagesAnalytics).length === 0 && "no data "}

                    {Object.entries(pagesAnalytics)?.map(([page, data]) => (
                      <div
                        key={page}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                            {page.at(-1)}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Page {page.at(-1)}
                            </p>
                            <p className="text-xs text-gray-500">
                              Avg time: {formatDuration(data.totalTime)} |
                              Bounce: {/* {page.bounceRate}% */}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {formatNumber(data.views)}
                          </p>
                          <p className="text-xs text-gray-500">views</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Most Clicked Buttons
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {/* {dashboardData.mostClickedButtons.map((button, index) => (
                      <div
                        key={button.buttonId}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <MousePointer className="h-5 w-5 text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 capitalize">
                              {button.buttonId.replace(/-/g, " ")}
                            </p>
                            <p className="text-xs text-gray-500">
                              Page {button.page} | Conv: {button.conversionRate}
                              %
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {button.clicks}
                          </p>
                          <p className="text-xs text-gray-500">clicks</p>
                        </div>
                      </div>
                    ))} */}

                    {Object.entries(mostClickedButtons).length === 0 &&
                      "no data "}

                    {Object.entries(mostClickedButtons)?.map(
                      ([pageKey, buttons], index) =>
                        buttons.map((btn, i) => (
                          <div
                            key={pageKey}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <MousePointer className="h-5 w-5 text-gray-400 mr-3" />
                              <div>
                                <p className="text-sm font-medium text-gray-900 capitalize">
                                  Page {pageKey?.replace("Page", "")}{" "}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">
                                  {btn?.buttonText} | Conv:{"10% "}
                                  {/* {button.conversionRate}% */}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900">
                                {formatNumber(btn?.clicks)}
                              </p>
                              <p className="text-xs text-gray-500">clicks</p>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Sources Tab */}
        {activeTab === "sources" && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Traffic Sources
                </h3>
                {Object.entries(sources?.trafficSources).length === 0 ? (
                  "no data"
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={Object.entries(sources?.trafficSources).map(
                          ([key, value]) => ({
                            name: key.charAt(0).toUpperCase() + key.slice(1),
                            value: parseFloat(value.percentage),
                            visitors: value?.count,
                          })
                        )}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {Object.entries(sources?.trafficSources).map(
                          (_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={colorArray[index]}
                            />
                          )
                        )}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Device Breakdown
                </h3>
                <div className="space-y-4">
                  {/* {dashboardData.deviceData.map((device, index) => (
                    <div
                      key={device.device}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded bg-blue-500 mr-3"
                          style={{
                            backgroundColor: ["#3B82F6", "#10B981", "#F59E0B"][
                              index
                            ],
                          }}
                        ></div>
                        <span className="text-sm font-medium text-gray-900">
                          {device.device}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {device.percentage}%
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatNumber(device.visitors)} users
                        </p>
                      </div>
                    </div>
                  ))} */}

                  {Object.entries(sources?.devices).length === 0 && "no data"}

                  {Object.entries(sources?.devices)?.map(
                    ([device, info], index) => (
                      <div
                        key={device}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div
                            className="w-4 h-4 rounded bg-blue-500 mr-3"
                            style={{
                              backgroundColor: [
                                "#3B82F6",
                                "#10B981",
                                "#F59E0B",
                              ][index],
                            }}
                          ></div>
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {device}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {info?.percentage}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatNumber(info?.count)} users
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Detailed Source Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Detailed Source Analysis
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {Object.entries(sources?.trafficSources).length === 0 &&
                    "no data"}

                  {Object.entries(sources?.trafficSources).map(
                    ([name, data], index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900 capitalize">
                            {name}
                          </h4>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: colorArray[index] }}
                          ></div>
                        </div>
                        <p className="text-2xl font-bold text-gray-900 ">
                          {formatNumber(data?.count)}
                        </p>
                        <p className="text-sm text-gray-500 ">
                          {data?.percentage} of total traffic
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Geography Tab */}
        {activeTab === "geography" && (
          <>
            {/* City Word Cloud */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                User Cities Word Cloud
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-4 py-8">
                {/* {dashboardData.cityData.map((city, index) => (
                  <span
                    key={city.city}
                    className="inline-block text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors"
                    style={{
                      fontSize: `${Math.max(14, (city.size / 100) * 48)}px`,
                      opacity: Math.max(0.6, city.size / 100),
                    }}
                    title={`${city.city}: ${formatNumber(
                      city.visitors
                    )} visitors`}
                  >
                    {city.city}
                  </span>
                ))} */}

                {geographyInfo?.cityWordCloud?.map((city, index) => (
                  <span
                    key={index}
                    className="inline-block text-blue-600 font-semibold hover:text-blue-800 cursor-pointer transition-colors"
                    style={{
                      fontSize: `${Math.max(14, (city?.count / 100) * 24)}px`,
                      opacity: Math.max(0.6, city?.count / 100),
                    }}
                    title={`${city?.city}: ${formatNumber(
                      city?.count
                    )} visitors`}
                  >
                    {city?.city}
                  </span>
                ))}

                {geographyInfo?.cityWordCloud.length === 0 && "no data"}
              </div>
            </div>

            {/* City Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Top Cities by Visitors
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Visitors
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {geographyInfo?.cityBreakdown?.map((city, index) => (
                      <tr key={city.city} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">
                              {city?.city}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatNumber(city?.count)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {city?.percentage}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                          <TrendingUp className="h-4 w-4 inline mr-1" />+
                          {(Math.random() * 20 + 5).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {geographyInfo?.cityBreakdown.length === 0 && (
                  <div className="text-center"> no data </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FlipbookAnalyticsDashboard;
