import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';

function PrivacyPolicy() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className='m-[2%] mt-[30px]'>
      <div className='flex items-center gap-[10px]'>
        <SecurityRoundedIcon
          sx={{
            color: darkMode ? 'white' : '#678B85',
            width: '20px',
            height: '20px',
          }}
        />
        <h2
          className={`mr-[10px] text-[1.4em] max-[450px]:text-[1.2em] font-bold ${
            darkMode ? 'text-white' : 'text-[#678B85]'
          }`}
        >
          Privacy Policy
        </h2>
      </div>
      <p className='mt-[40px]'>
        Welcome to AppliSnap! This <strong>Privacy Policy</strong> explains how
        we collect, use, and protect information when you use our application.
      </p>

      <h2
        className={`mt-[40px] font-bold mb-[8px] text-lg ${
          darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
        }`}
      >
        Information We Collect
      </h2>
      <p>We collect the following information:</p>
      <ul className='mt-[20px] list-disc ml-10'>
        <li>Unique user ID associated with your profile</li>
        <li>User email</li>
        <li>First and last name</li>
        <li>
          Job applications posted by the user (solely for display purposes
          within the platform for that specific user)
        </li>
      </ul>

      <h2
        className={`mt-[40px] font-bold mb-[8px] text-lg ${
          darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
        }`}
      >
        Purposes of Collection
      </h2>
      <p className='mt-4'>
        <strong>User ID:</strong>
      </p>
      <ul className='mt-[20px] list-disc ml-10'>
        <li>Enable the core functionality of the App and its expansion</li>
        <li>Personalize and improve your experience</li>
        <li>Troubleshoot technical issues</li>
      </ul>

      <p className='mt-4'>
        <strong>User Email, First and Last Name:</strong>
      </p>
      <ul className='mt-[20px] list-disc ml-10'>
        <li>Customization of user experience</li>
      </ul>

      <p className='mt-4'>
        <strong>Job Applications:</strong>
      </p>
      <ul className='mt-[20px] list-disc ml-10'>
        <li>Solely for displaying them in the platform for the user</li>
      </ul>

      <h2
        className={`mt-[40px] font-bold mb-[5px] text-lg ${
          darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
        }`}
      >
        How We Use Your Information
      </h2>
      <p>We use the collected information to:</p>
      <ul className='mt-[20px] list-disc ml-10'>
        <li>Customize your experience</li>
        <li>Improve our services and features</li>
        <li>Conduct analytics for performance enhancements</li>
        <li>Display job applications within the platform for the user</li>
      </ul>

      <h2
        className={`mt-[40px] font-bold mb-[8px] text-lg ${
          darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
        }`}
      >
        Data Security
      </h2>
      <p>We take the security of your information seriously:</p>
      <ul className='mt-[20px] list-disc ml-10'>
        <li>
          Your user ID, email, first and last name, and job applications are
          securely stored and transmitted.
        </li>
        <li>
          While we implement industry-standard measures, no method of
          transmission over the internet is 100% secure.
        </li>
      </ul>

      <h2
        className={`mt-[40px] font-bold mb-[8px] text-lg ${
          darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
        }`}
      >
        Disclosure of Information
      </h2>
      <p>
        We do not disclose your user ID, email, first and last name, or job
        applications to third parties except:
      </p>
      <ul className='mt-[20px] list-disc ml-10'>
        <li>To comply with legal obligations</li>
        <li>To protect and defend our rights and property</li>
      </ul>

      <p className='mt-3'>
        We do not sell your information for marketing purposes.
      </p>

      <h2
        className={`mt-[40px] font-bold mb-[8px] text-lg ${
          darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
        }`}
      >
        Children's Privacy
      </h2>
      <p>
        AppliSnap does not knowingly collect personally identifiable information
        from children under 13. If you are a parent and believe your child has
        provided personal information, please contact us.
      </p>

      <h2
        className={`mt-[40px] font-bold mb-[8px] text-lg ${
          darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
        }`}
      >
        Changes to This Privacy Policy
      </h2>
      <p>
        We may update this policy. We will notify you of any changes by posting
        the new Privacy Policy on this page.
      </p>

      <h2
        className={`mt-[40px] font-bold mb-[8px] text-lg ${
          darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
        }`}
      >
        Contact Us
      </h2>
      <p>
        If you have questions about this Privacy Policy, please{' '}
        <a
          className={`font-bold ${
            darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
          }`}
          href='mailto:applisnap2024@gmail.com'
        >
          contact us.
        </a>
      </p>
    </div>
  );
}

export default PrivacyPolicy;
