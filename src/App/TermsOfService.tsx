import React from 'react'
import styled from 'styled-components'

export type TermsOfServiceProps = React.HTMLProps<HTMLDivElement>

/**
 * A very generic Terms of Service.
 * 
 * This is only an example placeholder, not legal advice.
 * 
 * You will probably need to replace this with your own.
 */
export const TermsOfService = styled((props: TermsOfServiceProps) => (
  <div { ...props }>
    <h1>Terms of Service</h1>

    <h2>1. Terms</h2>

    <p>By using this Website, accessible from https://www.molecule.dev, https://app.molecule.dev, and https://api.molecule.dev, you are agreeing to be bound by these Terms of Service and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p>

    <h2>2. Use License</h2>

    <p>Permission is granted to temporarily download one copy of the materials on Molecule.dev's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>

    <ul>
        <li>modify or copy the materials;</li>
        <li>use the materials for any commercial purpose or for any public display;</li>
        <li>attempt to reverse engineer any software contained on Molecule.dev's Website;</li>
        <li>remove any copyright or other proprietary notations from the materials; or</li>
        <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
    </ul>

    <p>This will allow Molecule.dev to terminate its services upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.</p>

    <h2>3. Disclaimer</h2>

    <p>All the materials on Molecule.dev’s Website are provided "as is". Molecule.dev makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Molecule.dev does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>

    <h2>4. Limitations</h2>

    <p>Molecule.dev or its suppliers will not be held accountable for any damages that will arise with the use or inability to use the materials on Molecule.dev’s Website, even if Molecule.dev or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.</p>

    <h2>5. Revisions and Errata</h2>

    <p>The materials appearing on Molecule.dev’s Website may include technical, typographical, or photographic errors. Molecule.dev will not promise that any of the materials in this Website are accurate, complete, or current. Molecule.dev may change the materials contained on its Website at any time without notice. Molecule.dev does not make any commitment to update the materials.</p>

    <h2>6. Links</h2>

    <p>Molecule.dev has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by Molecule.dev of the site. The use of any linked website is at the user’s own risk.</p>

    <h2>7. Site Terms of Service Modifications</h2>

    <p>Molecule.dev may revise these Terms of Service for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms of Service.</p>

    <h2>8. Your Privacy</h2>

    <p>Please read our Privacy Policy.</p>

    <h2>9. Governing Law</h2>

    <p>Any claim related to Molecule.dev's Website shall be governed by the laws of us without regards to its conflict of law provisions.</p>
  </div>
))`
  width: 100%;
  max-width: 600px;
  padding: 15px;
  margin: 0 auto;
  color: ${({ theme }) => theme.colors.text};
`
