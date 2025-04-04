'use client';

const About = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-all sm:px-8 sm:py-12 md:px-10 md:py-14">
      <h1 className="text-2xl mt-3 sm:text-4xl font-bold text-gray-800 dark:text-white mb-2 text-center">
        About Budget
      </h1>

      <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-sm leading-relaxed text-center">
        <strong>Budget</strong> is a modern progressive web application (PWA)
        designed to help you manage your finances efficiently. Track your
        balance, analyze expenses and income, and improve your financial habits.
      </p>

      <h2 className="text-xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-200 mt-8 mb-4">
        Key Features
      </h2>

      <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
        <li>
          ✔ <strong>Real-time balance</strong> – track your income and expenses
          easily.
        </li>
        <li>
          ✔ <strong>Transaction categorization</strong> – organize your finances
          efficiently.
        </li>
        <li>
          ✔ <strong>Charts & analytics</strong> – visualize your financial
          habits.
        </li>
        <li>
          ✔ <strong>Security & privacy</strong> – store data locally or sync
          with the cloud.
        </li>
        <li>
          ✔ <strong>PWA support</strong> – use the app offline and install it on
          your device.
        </li>
      </ul>

      <h2 className="text-xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-200 mt-8 mb-4">
        Why Budget?
      </h2>

      <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
        <li>
          💰 <strong>Manage your money stress-free</strong> – always know how
          much you have.
        </li>
        <li>
          📊 <strong>Analyze & optimize expenses</strong> – find areas to save
          money.
        </li>
        <li>
          🚀 <strong>Simple & intuitive</strong> – easy-to-use interface for
          fast access to financial data.
        </li>
      </ul>
      <h2 className="text-xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-200 mt-8 mb-4">
        How it builds and works
      </h2>

      <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
        <li>
          👨 <strong>Built with Maxim Rudny's React.js free course</strong> –
          thanks to him for the app.
        </li>
        <li>
          🚆 <strong>Technologies</strong> – React.js 19, Next.js 14,
          TailwindCSS.
        </li>
        <li>
          📌 <strong>Non-commercial</strong> – no advertisements.
        </li>
      </ul>
      <h2 className="text-xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-200 mt-8 mb-4">
        Special thanks:
      </h2>

      <ul className="space-y-4 text-gray-600 dark:text-gray-300 text-sm">
        <li>
          👨 <strong>QA testing - Eugen Chub</strong> – thanks to him for the
          inspiration and good ideas.
        </li>
      </ul>
    </section>
  );
};

export default About;
