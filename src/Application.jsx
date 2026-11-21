import { useRef, useState } from 'react'
import { ArrowUpRight, Check, MessageCircle } from 'lucide-react'
import { site, whatsappUrl } from './site'

const fields = [
  { name: 'Full name', id: 'name', type: 'text', autocomplete: 'name', placeholder: 'Your name' },
  { name: 'Email', id: 'email', type: 'email', autocomplete: 'email', placeholder: 'you@example.com' },
  { name: 'Age', id: 'age', type: 'number', optional: true, placeholder: 'Optional', min: 1, max: 120 },
  { name: 'Primary fitness goal', id: 'goal', options: ['Build muscle', 'Lose fat', 'Body recomposition', 'Build strength', 'Improve fitness', 'Improve mobility', 'Return to training', 'Other'] },
  { name: 'Training experience', id: 'experience', options: ['New to training', 'Less than one year', 'One to three years', 'More than three years'] },
  { name: 'Training environment', id: 'environment', options: ['Gym', 'Home', 'Both'] },
  { name: 'Preferred coaching service', id: 'service', options: [...site.services, site.mobility].map(service => [service.id, service.name]).concat([['unsure', 'Help me choose']]) },
  { name: 'Additional message', id: 'message', optional: true, placeholder: 'Tell me a little about your goals or schedule.' },
]

export default function Application({ selectedService, onServiceChange }) {
  const [draft, setDraft] = useState('')
  const [feedback, setFeedback] = useState('')
  const draftRef = useRef(null)

  function submit(event) {
    event.preventDefault()
    const name = event.currentTarget.elements.namedItem('name')
    if (!name.value.trim()) {
      name.setCustomValidity('Enter your full name.')
      name.reportValidity()
      return
    }
    const data = new FormData(event.currentTarget)
    const lines = fields.flatMap(field => {
      const value = String(data.get(field.id) ?? '').trim()
      if (!value) return []
      const display = field.options?.find(option => Array.isArray(option) && option[0] === value)?.[1] ?? value
      return [`${field.name}: ${display}`]
    })
    const message = [`Hi ${site.brandName}! I'd like to apply for online coaching.`, '', ...lines].join('\n')
    setDraft(message)
    setFeedback('')
    if (whatsappUrl) {
      window.open(`${whatsappUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
      setFeedback('Review the draft in WhatsApp and tap Send when you’re ready.')
    } else {
      setFeedback('Your draft is ready to copy.')
    }
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft)
      setFeedback('Application copied.')
    } catch {
      draftRef.current?.select()
      setFeedback('Use your device’s copy command to copy the selected draft.')
    }
  }

  return <section className="application section" id="apply" tabIndex={-1}>
    <div className="wrap application-grid">
      <div>
        <p className="eyebrow">THE FIRST STEP</p>
        <h2>LET’S BUILD<br />YOUR <em>PLAN.</em></h2>
        <p className="section-copy">Tell me where you’re starting and what you want to work toward.</p>
        <ul className="application-notes">
          <li><Check size={17} /> Takes about two minutes</li>
          <li><Check size={17} /> Review your message before sending</li>
          <li><Check size={17} /> Your details stay in this tab until you share them</li>
        </ul>
        {!whatsappUrl && <p className="contact-status"><MessageCircle size={18} /> WhatsApp contact is pending. You can prepare and copy your application below.</p>}
      </div>
      <form className="form" onSubmit={submit}>
        {fields.map(field => <div className={['service', 'message'].includes(field.id) ? 'form-wide' : ''} key={field.id}>
          <label htmlFor={field.id}>{field.name}{field.optional && <span> · Optional</span>}</label>
          {field.options ? <select id={field.id} name={field.id} required
            {...(field.id === 'service' ? { value: selectedService, onChange: event => onServiceChange(event.target.value) } : { defaultValue: '' })}>
            <option value="" disabled>Select an option</option>
            {field.options.map(option => {
              const [value, label] = Array.isArray(option) ? option : [option, option]
              return <option key={value} value={value}>{label}</option>
            })}
          </select> : field.id === 'message' ? <textarea id={field.id} name={field.id} rows={4} maxLength={1000} placeholder={field.placeholder} />
            : <input id={field.id} name={field.id} type={field.type} autoComplete={field.autocomplete} required={!field.optional}
                min={field.min} max={field.max} maxLength={field.type === 'text' ? 120 : undefined} placeholder={field.placeholder}
                onInput={field.id === 'name' ? event => event.currentTarget.setCustomValidity('') : undefined} />}
        </div>)}
        <button className="button primary form-wide" type="submit">{whatsappUrl ? 'CONTINUE TO WHATSAPP' : 'PREPARE APPLICATION'} <ArrowUpRight size={17} /></button>
        <p className="form-wide status" role="status">{feedback}</p>
        {draft && <div className="form-wide draft">
          <label htmlFor="application-draft">Application draft</label>
          <textarea id="application-draft" ref={draftRef} value={draft} readOnly rows={7} />
          <button type="button" className="button secondary" onClick={copyDraft}>COPY APPLICATION</button>
        </div>}
      </form>
    </div>
  </section>
}
