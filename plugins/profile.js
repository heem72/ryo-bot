let PhoneNumber = require('awesome-phonenumber')
let levelling = require('../lib/levelling')
let handler = async (m, { conn, usedPrefix }) => {
  let pp = './src/avatar_contact.png'
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  try {
    pp = await conn.getProfilePicture(who)
  } catch (e) {

  } finally {
    let الخبر📮 = (await conn.getStatus(who).catch(console.error) || {}).status || ''
    let { الإسم🏷️, limit, exp, lastclaim, registered, regTime, age, level, role } = global.db.data.users[who]
    let { min, اللفل, max } = levelling.xpRange(level, global.multiplier)
    let username = conn.getName(who)
    let math = max - xp
    let prem = global.prems.includes(who.split`@`[0])
    let str = `
الإسم💳: ${username} ${registered ? '(' + name + ') ': ''}(@${who.replace(/@.+/, '')})${about ? '\nAbout: ' + about : ''}
الرقم#️⃣: ${PhoneNumber('+' + who.replace('@s.whatsapp.net', '')).getNumber('international')}
رابط الرقم🔗: https://wa.me/${who.split`@`[0]}${registered ? '\nAge: ' + age : ''}
الإكس بي🎚️: TOTAL ${exp} (${exp - min} / ${xp}) [${math <= 0 ? `Ready to *${usedPrefix}levelup*` : `${math} XP left to levelup`}]
اللفل🎰: ${level}
Role: *${role}*
حد ⚙️الإستخدام: ${limit}
Registered: ${registered ? 'Yes (' + new Date(regTime) + ')': 'No'}
: ${prem ? 'Yes' : 'No'}${lastclaim > 0 ? '\nLast Claim: ' + new Date(lastclaim) : ''}
`.trim()
    let mentionedJid = [who]
    conn.sendFile(m.chat, pp, 'pp.jpg', str, m, false, { contextInfo: { mentionedJid }})
  }
}
handler.help = ['profile [@user]']
handler.tags = ['tools']
handler.command = /^بروفايل$/i
module.exports = handler

