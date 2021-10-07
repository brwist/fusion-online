import React from "react"

interface CompleteRegistrationProps {}

export const CompleteRegistration: React.FC<CompleteRegistrationProps> = ({ ...props }) => {
  return (
    <div>
      <header className="my-3 d-flex justify-content-between align-items-center">
        <h2 className="h3 m-0">Complete Registration</h2>
      </header>
    </div>
  )
}