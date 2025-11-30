import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) {
          if (res.status === 401) {
            navigate("/login");
          }
          return;
        }
        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <div className="p-12 text-center text-slate-400">Loading profile...</div>;
  if (!user) return <div className="p-12 text-center text-slate-400">User not found.</div>;

  return (
    <div className="relative -mx-4 md:-mx-8 lg:-mx-12 -mt-4 md:-mt-6 lg:-mt-8 bg-gradient-to-b from-emerald-500/15 min-h-screen">
      <div className="relative w-full px-4 md:px-8 lg:px-12 pt-24 pb-20 max-w-3xl mx-auto">
        <div className="space-y-8">
          <div className="border-b border-slate-800 pb-6">
            <h1 className="text-3xl font-semibold text-slate-50">My Profile</h1>
            <p className="text-slate-400 mt-2">Manage your account information</p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 space-y-6">
            <div className="flex items-center gap-6">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-emerald-500/20">
                {user.email ? user.email[0].toUpperCase() : "?"}
              </div>
              <div>
                <h2 className="text-xl font-medium text-slate-50">{user.email}</h2>
                <p className="text-sm text-slate-400">Account Member</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 border-t border-slate-800 pt-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                <div className="text-slate-200 bg-slate-900/50 px-4 py-3 rounded-lg border border-slate-800">
                  {user.email}
                </div>
              </div>
              
              {/* Placeholder for additional fields that might be gathered */}
              <div>
                 <label className="block text-sm font-medium text-slate-400 mb-2">Account Status</label>
                 <div className="text-slate-200 bg-slate-900/50 px-4 py-3 rounded-lg border border-slate-800">
                    Active
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
