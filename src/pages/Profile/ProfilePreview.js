import React, { forwardRef } from 'react';
import {
  faUser,
  faBriefcase,
  faGraduationCap,
  faProjectDiagram,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfilePreview = forwardRef(function ProfilePreview({
  basicInfoContent,
  weTableContent,
  prTableContent,
  edTableContent,
  achTableContent,
},ref) {
  return (
    <div ref={ref} className="bg-white p-6 rounded-lg shadow-lg min-h-[85vh] min-w-[60vw]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Basic Info */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Basic Info
          </h2>
          <p className="mb-2">
            <strong>Name:</strong> {basicInfoContent?.name}
          </p>
          <p className="mb-2">
            <strong>Title:</strong> {basicInfoContent?.currentTitle}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {basicInfoContent?.email}
          </p>
          {/* Add other basic info fields here */}
        </div>

        {/* Work Experience */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
            Work Experience
          </h2>
          {weTableContent.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="mb-2">
                <strong>Title:</strong> {item.title}
              </p>
              <p className="mb-2">
                <strong>Company Name:</strong> {item.companyName}
              </p>
              {/* Add other work experience fields here */}
            </div>
          ))}
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            <FontAwesomeIcon icon={faProjectDiagram} className="mr-2" />
            Projects
          </h2>
          {prTableContent.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="mb-2">
                <strong>Project Title:</strong> {item.projectTitle}
              </p>
              <p className="mb-2">
                <strong>Overview:</strong> {item.overview}
              </p>
              {/* Add other project fields here */}
            </div>
          ))}
        </div>

        {/* Education */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
            Education
          </h2>
          {edTableContent.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="mb-2">
                <strong>Title:</strong> {item.eduTitle}
              </p>
              <p className="mb-2">
                <strong>College/School:</strong> {item.collegeOrSchool}
              </p>
              {/* Add other education fields here */}
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            <FontAwesomeIcon icon={faTrophy} className="mr-2" />
            Achievements
          </h2>
          {achTableContent.map((item, index) => (
            <div key={index} className="mb-4">
              <p className="mb-2">
                <strong>Title:</strong> {item.achievementTitle}
              </p>
              <p className="mb-2">
                <strong>Description:</strong> {item.achievementDescription}
              </p>
              {/* Add other achievement fields here */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ProfilePreview;
