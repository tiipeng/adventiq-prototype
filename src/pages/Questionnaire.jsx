// src/pages/Questionnaire.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Stepper from '../components/Stepper.jsx'

export default function Questionnaire() {
  const navigate = useNavigate()
  const steps = ['Goal', 'Field', 'Budget & Urgency']
  const [current, setCurrent] = useState(0)

  const [answers, setAnswers] = useState({
    goal: '',
    outcome: '',
    field: 'AI',
    fieldOther: '',
    budget: '<€1k',
    urgency: 'Medium',
  })

  const next = () => setCurrent((c) => Math.min(c + 1, steps.length - 1))
  const back = () => setCurrent((c) => Math.max(c - 1, 0))

  const submit = () => {
    try {
      sessionStorage.setItem('consultation_questionnaire', JSON.stringify(answers))
    } catch (error) {
      console.warn('Unable to persist questionnaire answers', error)
    }

    // UI-only: just navigate to suggested
    navigate('/dashboard/consultation/suggested')
  }

  const Summary = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-4 text-sm">
      <h4 className="font-semibold text-primary mb-2">Summary</h4>
      <div className="space-y-1 text-gray-700">
        <div><span className="text-gray-500">Goal:</span> {answers.goal || '—'}</div>
        <div><span className="text-gray-500">Outcome:</span> {answers.outcome || '—'}</div>
        <div><span className="text-gray-500">Field:</span> {answers.field}{answers.field === 'Other' && answers.fieldOther ? ` — ${answers.fieldOther}` : ''}</div>
        <div><span className="text-gray-500">Budget:</span> {answers.budget}</div>
        <div><span className="text-gray-500">Urgency:</span> {answers.urgency}</div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">Expert questionnaire</h1>
        <p className="text-gray-600 mt-2">Answer 3 quick steps and see suggested experts.</p>
      </header>

      <Stepper steps={steps} current={current} />

      <div className="mt-6 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {/* Step 1 */}
          {current === 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-primary mb-3">Step 1 — Goal</h3>
              <label className="block text-sm text-gray-600 mb-1">Project goal / problem</label>
              <textarea
                className="w-full border rounded-lg px-3 py-2 mb-3"
                rows={4}
                value={answers.goal}
                onChange={(e) => setAnswers(a => ({ ...a, goal: e.target.value }))}
                placeholder="Describe your goal or problem…"
              />
              <label className="block text-sm text-gray-600 mb-1">Desired outcome</label>
              <input
                className="w-full border rounded-lg px-3 py-2"
                value={answers.outcome}
                onChange={(e) => setAnswers(a => ({ ...a, outcome: e.target.value }))}
                placeholder="What does success look like?"
              />
            </div>
          )}

          {/* Step 2 */}
          {current === 1 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-primary mb-3">Step 2 — Field</h3>
              <label className="block text-sm text-gray-600 mb-1">Field or topic</label>
              <select
                className="w-full border rounded-lg px-3 py-2"
                value={answers.field}
                onChange={(e) => setAnswers(a => ({ ...a, field: e.target.value }))}
              >
                <option>AI</option>
                <option>Materials</option>
                <option>Manufacturing</option>
                <option>Biotech</option>
                <option>Energy</option>
                <option>Other</option>
              </select>
              {answers.field === 'Other' && (
                <input
                  className="w-full border rounded-lg px-3 py-2 mt-3"
                  placeholder="Specify other field"
                  value={answers.fieldOther}
                  onChange={(e) => setAnswers(a => ({ ...a, fieldOther: e.target.value }))}
                />
              )}
            </div>
          )}

          {/* Step 3 */}
          {current === 2 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-semibold text-primary mb-3">Step 3 — Budget & Urgency</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Budget</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={answers.budget}
                    onChange={(e) => setAnswers(a => ({ ...a, budget: e.target.value }))}
                  >
                    <option>{'<€1k'}</option>
                    <option>€1–3k</option>
                    <option>€3–10k</option>
                    <option>€10k+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Urgency</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={answers.urgency}
                    onChange={(e) => setAnswers(a => ({ ...a, urgency: e.target.value }))}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex justify-between">
            <button
              className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
              onClick={back}
              disabled={current === 0}
            >
              Back
            </button>
            {current < steps.length - 1 ? (
              <button
                className="px-3 py-1.5 rounded-lg bg-primary text-white"
                onClick={next}
              >
                Next
              </button>
            ) : (
              <button
                className="px-3 py-1.5 rounded-lg bg-primary text-white"
                onClick={submit}
              >
                See Suggested Experts
              </button>
            )}
          </div>
        </div>

        {/* Right summary */}
        <div className="hidden md:block">
          <Summary />
        </div>
      </div>

      {/* Mobile summary */}
      <div className="md:hidden mt-6">
        <Summary />
      </div>
    </div>
  )
}
