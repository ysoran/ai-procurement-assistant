import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Zap, Loader, XCircle } from "lucide-react";
import axios from "axios";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ParsedEmail {
  subject: string;
  content: string;
  extracted: string;
}

interface Insight {
  summary: string;
  riskLevel: string;
  suggestions: string[];
}

export default function ProcurementAssistantDashboard() {
  const [emails, setEmails] = useState<ParsedEmail[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [activeTab, setActiveTab] = useState("dashboard"); // Active tab state

  useEffect(() => {
    fetchParsedEmails();
    fetchInsights();
  }, []);

  const fetchParsedEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/emails");
      setEmails(response.data);
      fetchInsights(); // Re-fetch insights after emails are fetched
    } catch (error) {
      setError("Error fetching emails. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8000/api/insights");
      setInsights(response.data);
    } catch (error) {
      setError("Error fetching insights. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1a1a1a] p-6 text-gray-800 dark:text-white">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-600">AI Procurement Assistant</h1>
      </header>

      <Button
        onClick={async () => {
          setLoading(true);
          setError(null);
          try {
            const response = await axios.get("http://localhost:8000/api/fetch-emails");
            setEmails(response.data);
            fetchInsights(); // Re-fetch insights after emails are fetched
          } catch (error) {
            setError("Failed to fetch emails from inbox.");
          } finally {
            setLoading(false);
          }
        }}
        className="mb-4"
      >
        Fetch from Inbox
      </Button>

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger tabValue="dashboard" activeTab={activeTab} onTabChange={setActiveTab}>
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </TabsTrigger>
          <TabsTrigger tabValue="emails" activeTab={activeTab} onTabChange={setActiveTab}>
            <FileText className="mr-2 h-4 w-4" /> Emails
          </TabsTrigger>
          <TabsTrigger tabValue="insights" activeTab={activeTab} onTabChange={setActiveTab}>
            <Zap className="mr-2 h-4 w-4" /> AI Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent tabValue="dashboard" activeTab={activeTab}>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Weekly Overview</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Graph of procurement value, supplier count, and processing time.
              </p>
              <div className="mt-4 h-40 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent tabValue="emails" activeTab={activeTab}>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Parsed Emails</h2>
              {loading ? (
                <div className="flex justify-center items-center mt-4">
                  <Loader className="animate-spin h-6 w-6 text-blue-600" />
                </div>
              ) : error ? (
                <div className="flex justify-center items-center mt-4 text-red-600">
                  <XCircle className="mr-2" /> {error}
                </div>
              ) : (
                emails.map((email, index) => (
                  <div key={index} className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow mb-4">
                    <p className="font-medium text-lg">{email.subject}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{email.extracted}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent tabValue="insights" activeTab={activeTab}>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">AI Insights</h2>
              {loading ? (
                <div className="flex justify-center items-center mt-4">
                  <Loader className="animate-spin h-6 w-6 text-blue-600" />
                </div>
              ) : error ? (
                <div className="flex justify-center items-center mt-4 text-red-600">
                  <XCircle className="mr-2" /> {error}
                </div>
              ) : (
                insights.map((insight, index) => (
                  <div key={index} className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow mb-4">
                    <p className="font-medium text-lg">{insight.summary}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Risk Level: {insight.riskLevel}</p>
                    <ul className="list-disc pl-6 text-sm text-gray-600 dark:text-gray-300">
                      {insight.suggestions.map((suggestion, idx) => (
                        <li key={idx}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
