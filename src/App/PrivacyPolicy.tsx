import React from 'react'
import styled from 'styled-components'

export type PrivacyPolicyProps = React.HTMLProps<HTMLDivElement>

/**
 * A very generic Privacy Policy.
 * 
 * This is only an example placeholder, not legal advice.
 * 
 * You will probably need to replace this with your own.
 */
export const PrivacyPolicy = styled((props: PrivacyPolicyProps) => (
  <div { ...props }>
    <h1>Privacy Policy</h1>

    <h3>In summary: We do not track you in any way. We do not share or sell your information. We use the contact information you optionally provide to us to communicate with you and send you information about Molecule.dev.</h3>

    <p>At Molecule.dev, accessible from https://www.molecule.dev, https://app.molecule.dev, and  https://api.molecule.dev, we value the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Molecule.dev and how we use it.</p>

    <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>

    <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Molecule.dev. This policy is not applicable to any information collected offline or via channels other than this website.</p>

    <h2>Consent</h2>

    <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms. For our Terms of Service, please see our Terms &amp; Conditions.</p>

    <h2>Information we collect</h2>

    <p>Providing personal information is completely optional. It is entirely up to you.</p>
    <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
    <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
    <p>When you register for an Account, we may ask for your contact information, including items such as name, email address, telephone number, company name, and address.</p>

    <h2>How we use your information</h2>

    <p>If you choose to provide your personal information, it may be used for the following:</p>

    <ul>
      <li>Personalization within the Molecule.dev application</li>
      <li>Communicate with you, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
      <li>Send you emails</li>
      <li>Prevent fraud</li>
    </ul>

    <h2>Log Files</h2>

    <p>The landing page, accessible from https://www.molecule.dev, logs no information about visitors.</p>
    <p>The demo application, accessible from https://app.molecule.dev, logs no information about visitors.</p>
    <p>The API, accessible from https://api.molecule.dev follows standard logging procedures. The information logged includes internet protocol (IP) addresses, browser types (user agents), date and time stamps, and referring/exit pages. These are not linked to any information that is personally identifiable. The purpose of the information is for debugging, security, and keeping the site running.</p>

    <h2>Cookies</h2>

    <p>The landing page, accessible from https://www.molecule.dev, uses no cookies.</p>
    <p>The demo application, accessible from https://app.molecule.dev, uses a single browser cookie to securely keep you logged in for requests made to the API at https://api.molecule.dev.</p>
    <p>We do not use cookies to track user behavior.</p>
    <p>We do not use or allow any cookies or scripts from a third party.</p>

    <p>For more general information on cookies, please read <a href="https://www.cookieconsent.com/what-are-cookies/">"What Are Cookies"</a>.</p>

    <h2>GDPR Data Protection Rights</h2>

    <p>Every user is entitled to the following:</p>
    <p>The right to access – You have the right to request copies of your personal data.</p>
    <p>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>
    <p>The right to erasure – You have the right to request that we erase your personal data.</p>
    <p>The right to restrict processing – You have the right to request that we restrict the processing of your personal data.</p>
    <p>The right to object to processing – You have the right to object to our processing of your personal data.</p>
    <p>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you.</p>
    <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

    <h2>Children's Information</h2>

    <p>Molecule.dev does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>
  </div>
))`
  width: 100%;
  max-width: 600px;
  padding: 15px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.text};
`
