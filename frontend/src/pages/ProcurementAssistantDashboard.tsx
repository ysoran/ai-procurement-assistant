// Project: AI-Powered Procurement Assistant (Full MVP with Backend Integration)
// This file includes a React + TypeScript + Tailwind frontend dashboard
// integrated with a FastAPI backend (to be built separately) for email parsing and AI insights.

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Zap, Settings } from "lucide-react";
import axios from "axios";

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

  useEffect(() => {
    fetchParsedEmails();
    fetchInsights();
  }, []);

  const fetchParsedEmails = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/emails");
      setEmails(response.data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const fetchInsights = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/insights");
      setInsights(response.data);
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#1a1a1a] p-6 text-gray-800 dark:text-white">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Procurement Assistant</h1>
        <Button variant="default" onClick={fetchParsedEmails}>Refresh Emails</Button>
      </header>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
          </TabsTrigger>
          <TabsTrigger value="emails">
            <FileText className="mr-2 h-4 w-4" /> Emails
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Zap className="mr-2 h-4 w-4" /> AI Insights
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Weekly Overview</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Graph of procurement value, supplier count, and processing time.
              </p>
              <div className="mt-4 h-40 bg-gray-200 dark:bg-gray-800 rounded-xl" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emails">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Parsed Emails</h2>
              {emails.map((email, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow mb-4">
                  <p className="font-medium">Subject: {email.subject}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{email.content}</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">Extracted: {email.extracted}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">AI-Powered Insights</h2>
              {insights.map((insight, index) => (
                <div key={index} className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow mb-4">
                  <p className="font-medium">Risk Level: {insight.riskLevel}</p>
                  <p className="text-sm">{insight.summary}</p>
                  <ul className="mt-2 list-disc list-inside text-sm">
                    {insight.suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Settings</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Configure AI model, ERP endpoints, or email parsing rules.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
