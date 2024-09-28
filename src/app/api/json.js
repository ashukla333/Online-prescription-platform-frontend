
  export const  doctorSignUp = [
      {
        "label": "Profile Picture",
        "name": "profilePicture",
        "type": "file",
        "validation": { "required": true, "message": "Profile picture is required" }
      },
      {
        "label": "Full Name",
        "name": "name",
        "type": "text",
        "placeholder": "Enter your full name",
        "validation": { "required": true, "message": "Name is required" }
      },
      {
        "label": "Specialty",
        "name": "specialty",
        "type": "text",
        "placeholder": "Enter your specialty",
        "validation": { "required": true, "message": "Specialty is required" }
      },
      {
        "label": "Email",
        "name": "email",
        "type": "email",
        "placeholder": "Enter your email",
        "validation": { "required": true, "message": "Email is required" }
      },
      {
        "label": "Phone Number",
        "name": "phone",
        "type": "tel",
        "placeholder": "Enter your phone number",
        "validation": { "required": true, "message": "Phone number is required" }
      },
      {
        "label": "Years of Experience",
        "name": "experience",
        "type": "number",
        "step": "0.1",
        "placeholder": "Enter years of experience (Eg: 1.5)",
        "validation": { "required": true, "message": "Experience is required" }
      }
    ]

  export const patientSignUp= [
      {
        "label": "Profile Picture",
        "name": "profilePicture",
        "type": "file",
        "validation": { "required": true, "message": "Profile picture is required" }
      },
      {
        "label": "Full Name",
        "name": "name",
        "type": "text",
        "placeholder": "Enter your full name",
        "validation": { "required": true, "message": "Name is required" }
      },
      {
        "label": "Age",
        "name": "age",
        "type": "number",
        "placeholder": "Enter your age",
        "validation": { "required": true, "message": "Age is required" }
      },
      {
        "label": "Email",
        "name": "email",
        "type": "email",
        "placeholder": "Enter your email",
        "validation": { "required": true, "message": "Email is required" }
      },
      {
        "label": "Phone Number",
        "name": "phone",
        "type": "tel",
        "placeholder": "Enter your phone number",
        "validation": { "required": true, "message": "Phone number is required" }
      },
      {
        "label": "History of Surgery",
        "name": "surgeryHistory",
        "type": "textarea",
        "placeholder": "Enter history of surgeries"
      },
      {
        "label": "History of Illness",
        "name": "illness",
        "type": "textarea",
        "placeholder": "Enter history of illnesses (separated by commas)"
      }
    ]
  
  