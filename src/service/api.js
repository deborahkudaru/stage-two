const SESSION_KEY = 'ticketapp_session';
const TICKETS_KEY = 'ticketapp_tickets';

const delay = ms => new Promise(r => setTimeout(r, ms || 350));

function readTickets() {
  try {
    const raw = localStorage.getItem(TICKETS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function writeTickets(list) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(list));
}

export const AuthAPI = {
  signup({ name, email, password }) {
    return delay().then(() => {
      if (!email.includes('@')) return Promise.reject({ message: 'Invalid credentials' });
      const token = 'sess_' + Math.random().toString(36).slice(2);
      const session = { token, user: { id: 'u_' + Date.now(), name, email }, exp: Date.now() + 1000*60*60*24 };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    });
  },
  login({ email, password }) {
    return delay().then(() => {
      if (!email.includes('@')) return Promise.reject({ message: 'Invalid credentials' });
      const token = 'sess_' + Math.random().toString(36).slice(2);
      const session = { token, user: { id: 'u_demo', name: 'Demo', email }, exp: Date.now() + 1000*60*60*24 };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    });
  },
  logout() {
    localStorage.removeItem(SESSION_KEY);
    return Promise.resolve();
  },
  getSession() {
    try {
      const s = localStorage.getItem(SESSION_KEY);
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  }
};

export const TicketAPI = {
  list() {
    return delay().then(() => {
      if (Math.random() < 0.02) return Promise.reject({ message: 'Failed to load tickets. Please retry.' });
      return readTickets();
    });
  },
  create(ticket) {
    return delay().then(() => {
      if (!ticket.title || !ticket.status) return Promise.reject({ message: 'Validation error' });
      const list = readTickets();
      const newTicket = { ...ticket, id: 't_' + Date.now(), createdAt: Date.now() };
      list.unshift(newTicket);
      writeTickets(list);
      return newTicket;
    });
  },
  update(id, patch) {
    return delay().then(() => {
      const list = readTickets();
      const i = list.findIndex(t => t.id === id);
      if (i === -1) return Promise.reject({ message: 'Ticket not found' });
      list[i] = { ...list[i], ...patch, updatedAt: Date.now() };
      writeTickets(list);
      return list[i];
    });
  },
  remove(id) {
    return delay().then(() => {
      let list = readTickets();
      list = list.filter(t => t.id !== id);
      writeTickets(list);
      return { success: true };
    });
  }
};
