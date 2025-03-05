# budget

### The app to manage your cash flows.

### The application is deployed here:

https://budget4u.vercel.app

<ul>
<li>⭐collect your cash transactions</li>
<li>⭐watch statistics</li>
<li>⭐make plans (fill transactions on future dates)</li>
</ul>

<p>Sample:</p>

<p>This Next.js PWA project uses next plug-ns, API, libraries:</p>
<ul>
<li>⭐https://www.npmjs.com/package/react-intl</li>
<li>⭐https://www.npmjs.com/package/react-window</li>
<li>⭐https://www.npmjs.com/package/react-virtualized</li>
<li>⭐https://www.npmjs.com/package/react-virtualized-auto-sizer</li>
<li>⭐https://www.npmjs.com/package/react-window-infinite-loader</li>
<li>⭐https://www.npmjs.com/package/webpack-bundle-analyzer</li>
<li>⭐https://www.npmjs.com/package/chalk</li>
</ul>

<p>Built with Tailwind CSS (adaptive designed), and suitable for most popular devices.</p>

<p>To run the project on your PC you must have installed Node.js also you should write in the VSC terminal following:</p>
<li>npm install</li>
<li>npm run dev</li>

<br>

### License

<hr>
<p>The app is free to use for personal and commercial purposes, but attribution is required. Please credit the app and its creators in any blog posts or other content generated using the app.</p>

<p>Structure:</p>
<pre>
.
├── next.config.mjs  
├── package-lock.json   /
│   ├── src/
│   ├── __tests__/  
│   ├── babel.config.js  
│   ├── constants/  
│   ├── hooks.js    
│   ├── scripts/
│   ├── app/   
│   │   ├── about/            
│   │   ├── globals.css    
│   │   ├── layout.js  
│   │   ├── settings/
│   │   ├── client-layout.js  
│   │   ├── Home.test.tsx  
│   │   ├── page.js    
│   │   └── statistics/     
│   ├── components/ 
│   │   ├── Balance/        
│   │   ├── Counter/          
│   │   ├── Form/     
│   │   ├── Modal/   
│   │   ├── ThemeSwitch/
│   │   ├── BalanceData/    
│   │   ├── ErrorBoundary/    
│   │   ├── Heading/  
│   │   ├── NavBar/  
│   │   ├── Transaction/
│   │   ├── ChangeBalance/  
│   │   ├── ErrorSimulation/  
│   │   ├── Logo/     
│   │   ├── Portal/  
│   │   └── Transactions/     
│   ├── HOCs/       
│   ├── providers/  
│   └── utils/
├── eslint.config.mjs  
├── next-env.d.ts    
├── postcss.config.mjs  
├── tailwind.config.mjs
├── jest.config.js     
├── node_modules/    
├── public/             
├── tsconfig.json
├── jsconfig.json      
├── package.json     
└── README.md
</pre>

<p>TODO:</p>
<ul>
<li>❎statistics</li>
<li>❎checkbox for filter starred transactions</li>
<li>❎fix UI as a table</li>
<li>❎ translate About</li>
<li>❎ get rid of decimal in advanced settings to the balance and all amound digits</li>
<li>❎ advanced settings - make plan amount of categories per day to mark them red or green</li>
</ul>
