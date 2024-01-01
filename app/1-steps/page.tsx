'use client';

import React, { useState } from 'react';

export default function Page() {
  let [step, setStep] = useState(1);

  return (
    <div className="from-slate-700 to-slate-900 flex min-h-screen items-start bg-gradient-to-br pt-40">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white">
        <div className="flex justify-between rounded p-8">
          <Step step={1} currentStep={step} />
          <Step step={2} currentStep={step} />
          <Step step={3} currentStep={step} />
          <Step step={4} currentStep={step} />
        </div>
        <div className="px-8 pb-8">
          <div>
            <div className="bg-slate-100 mt-2 h-6 w-40 rounded" />
            <div className="mt-4 space-y-2">
              <div className="bg-slate-100 h-4 w-5/6 rounded" />
              <div className="bg-slate-100 h-4 rounded" />
              <div className="bg-slate-100 h-4 w-4/6 rounded" />
            </div>
          </div>

          <div className="mt-10 flex justify-between">
            <button
              onClick={() => setStep(step < 2 ? step : step - 1)}
              className="text-slate-400 hover:text-slate-700 rounded px-2 py-1"
            >
              Back
            </button>
            <button
              onClick={() => setStep(step > 4 ? step : step + 1)}
              className={`${
                step > 4 ? 'pointer-events-none opacity-50' : ''
              } bg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 flex items-center justify-center rounded-full px-3.5 py-1.5 font-medium tracking-tight text-white`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step({ step, currentStep }: { step: number; currentStep: number }) {
  let status =
    currentStep === step
      ? 'active'
      : currentStep < step
        ? 'inactive'
        : 'complete';

  return (
    <div
      className={`${
        status === 'active'
          ? 'border-blue-500 text-blue-500 bg-white'
          : status === 'complete'
            ? 'border-blue-500 bg-blue-500'
            : 'border-slate-200 text-slate-400 bg-white'
      } flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold`}
    >
      <div className="flex items-center justify-center">
        {status === 'complete' ? (
          <CheckIcon className="h-6 w-6 text-white" />
        ) : (
          <span>{step}</span>
        )}
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
