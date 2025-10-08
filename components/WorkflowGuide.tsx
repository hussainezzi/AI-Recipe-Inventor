import React from 'react';

const Step1Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
);

const Step2Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a7.5 7.5 0 00-7.5 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 6.75h.008v.008H9.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V11.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636" />
    </svg>
);

const Step3Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
);

const Step4Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
);


const workflowSteps = [
    {
        icon: <Step1Icon />,
        title: '1. Spark an Idea',
        description: 'Enter the ingredients you have and a cuisine style you love.'
    },
    {
        icon: <Step2Icon />,
        title: '2. Get a Name',
        description: 'Our AI invents a creative recipe name and suggests variations.'
    },
    {
        icon: <Step3Icon />,
        title: '3. Receive the Recipe',
        description: 'Get a full, detailed recipe with instructions, servings, and time.'
    },
    {
        icon: <Step4Icon />,
        title: '4. Create Content',
        description: 'Generate stunning photos and a social media caption for your creation.'
    },
];

export const WorkflowGuide: React.FC = () => {
    return (
        <section className="text-center my-12">
            <h2 className="text-3xl font-bold font-sans mb-4 text-earthy-brown">Your Workflow, Simplified</h2>
            <p className="text-lg text-earthy-brown/80 mb-10 max-w-3xl mx-auto">Follow these four simple steps to go from a handful of ingredients to a complete, beautiful, and shareable recipe post.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {workflowSteps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center p-4">
                        <div className="text-warm-orange mb-4">
                            {step.icon}
                        </div>
                        <h3 className="text-xl font-bold font-sans text-earthy-brown mb-2">{step.title}</h3>
                        <p className="text-earthy-brown/80">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
