import React from 'react'
import ClassicTemplate from '../templates/ClassicTemplate'
import ModernTemplate from '../templates/ModernTemplate'
import CreativeTemplate from '../templates/CreativeTemplate'

const ResumePreview = ({ data, template }) => {
  // Render template based on selection
  switch(template) {
    case 'modern':
      return <ModernTemplate data={data} />
    case 'classic':
      return <ClassicTemplate data={data} />
    case 'creative':
      return <CreativeTemplate data={data} />
    default:
      return <ModernTemplate data={data} />
  }
}


export default ResumePreview