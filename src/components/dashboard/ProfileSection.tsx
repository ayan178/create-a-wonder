
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface ProfileData {
  name: string;
  email: string;
  role: string;
  location: string;
  bio: string;
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    duration: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
}

interface ProfileSectionProps {
  profileData: ProfileData;
  progress: number;
}

const ProfileSection = ({ profileData, progress }: ProfileSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-20 w-20 mb-2">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-lg">{profileData.name}</h3>
              <p className="text-muted-foreground">{profileData.role}</p>
              <p className="text-sm">{profileData.location}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">About</h4>
              <p className="text-sm">{profileData.bio}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill) => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>
            </div>
            
            <Button className="w-full" asChild>
              <Link to="/candidate/profile">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Experience and Education */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Experience & Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Work Experience</h3>
              <div className="space-y-4">
                {profileData.experience.map((exp, i) => (
                  <div key={i} className="border-l-2 border-primary pl-4 py-1">
                    <h4 className="font-medium">{exp.title}</h4>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <p className="text-xs">{exp.duration}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Education</h3>
              <div className="space-y-4">
                {profileData.education.map((edu, i) => (
                  <div key={i} className="border-l-2 border-primary pl-4 py-1">
                    <h4 className="font-medium">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-xs">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Profile Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={progress} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground">
                  Complete your profile to improve your interview matches
                </p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSection;
