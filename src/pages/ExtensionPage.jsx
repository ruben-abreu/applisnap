import { useContext } from 'react';
import { ThemeContext } from '../context/theme.context';
import ExtensionIcon from '@mui/icons-material/Extension';
import example1 from '../assets/ExtensionExample.png';
import example2 from '../assets/ExtensionExample2.png';

function ExtensionPage() {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className="m-[2%] my-[30px] pb-[30px]">
      <div className="flex items-center gap-[10px] mt-[30px] mb-[10px] h-[70px]">
        <ExtensionIcon
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
          AppliSnap Extension
        </h2>
      </div>
      <div className="float-right ml-[15px] my-[15px]">
        <img src={example1} alt="example image" className="w-[192px]" />
        <img src={example2} alt="example image 2" className="w-[192px]" />
      </div>
      <div>
        <h2
          className={`mt-[30px] font-bold mb-[8px] text-lg ${
            darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
          }`}
        >
          Installing the AppliSnap extension
        </h2>
        <p className="mt-[20px]">
          To download the AppliSnap Extension for Google Chrome, click{' '}
          <a
            href="https://chromewebstore.google.com/detail/applisnap/ncfnpjdjjopfnhjhfdeaggnmncppdgkh"
            className={`font-bold ${
              darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
            }`}
            target="_blank"
          >
            here
          </a>
        </p>
        <h2
          className={`mt-[30px] font-bold mb-[8px] text-lg ${
            darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
          }`}
        >
          Adding AppliSnap to your Chrome Toolbar
        </h2>
        <p className="mt-[20px]">
          When you install AppliSnap, you'll need to pin the AppliSnap button,
          so it'll be accessible on the right side of your address bar. Click
          the Extensions button (it looks like a puzzle piece). Then, look for
          AppliSnap and click the pin button. You'll now see the AppliSnap
          button on the right side of your address bar.
        </p>
        <h2
          className={`mt-[30px] font-bold mb-[5px] text-lg ${
            darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
          }`}
        >
          Using the extension to add Jobs to your Boards
        </h2>

        <p className="mt-[20px]">
          Adding jobs to your boards through our extension is as straightforward
          as in our main application. When you use the extension for the first
          time, you'll need to log in to specify which of your boards and lists
          you'd like to add your job applications to. After this initial setup,
          simply fill out the form as you would in our main application, then
          click
          <span className="font-bold"> "Add job" </span> to complete the
          process.
        </p>
        <h2
          className={`mt-[30px] font-bold mb-[8px] text-lg ${
            darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
          }`}
        >
          Common Questions
        </h2>
        <p className=" mt-[20px] font-bold">
          I use a Chromium-based browser. Can I install the AppliSnap extension?
        </p>
        <p className="mt-[20px]">
          Yes! Chromium browsers (such as Brave, Opera, and Vivaldi) can run
          Chrome extensions, so AppliSnap and most other Chrome extensions
          should be compatible.
        </p>
        <p className="mt-[30px] font-bold">
          If you have any additional questions, please{' '}
          <a
            href="mailto:applisnap2024@gmail.com"
            target="_blank"
            rel="noreferrer"
            className={`font-bold ${
              darkMode ? 'text-[#ff8956]' : 'text-[#f06c35]'
            }`}
          >
            contact us.
          </a>
        </p>
      </div>
    </div>
  );
}

export default ExtensionPage;
