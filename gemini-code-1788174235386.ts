'use client';

import React, { useState, useEffect } from 'react';
import { Camera, User, Bell, MessageSquare, ShieldAlert, PlusCircle, Trash2 } from 'lucide-react';

export default function FutureClass() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [years, setYears] = useState(Array.from({ length: 23 }, (_, i) => 2005 + i));
  const [selectedYear, setSelectedYear] = useState(2026);
  const [warnings, setWarnings] = useState<{ [key: string]: number }>({});
  const [bannedUsers, setBannedUsers] = useState<string[]>([]);
  
  const [notices, setNotices] = useState([{ id: 1, text: "미래공학 학급 홈페이지가 개설되었습니다." }]);
  const [news, setNews] = useState([{ id: 1, text: "미래공학 학급 로봇 프로젝트 개시!" }]);
  const [dailyPosts, setDailyPosts] = useState<{ name: string; text: string; date: string }[]>([]);
  
  const [postInput, setPostInput] = useState("");
  const [userName, setUserName] = useState("");
  const [noticeInput, setNoticeInput] = useState("");

  useEffect(() => {
    const askAdmin = confirm("관리자(선생님) 권한으로 접속하시겠습니까?\n[확인] 관리자 / [취소] 학생 모드");
    setIsAdmin(askAdmin);
  }, []);

  const triggerUpload = (id: string) => {
    document.getElementById(id)?.click();
  };

  const submitDailyPost = () => {
    if (!userName || !postInput) return alert("이름과 내용을 입력하세요.");
    if (bannedUsers.includes(userName)) return alert("당신은 경고 3회 누적으로 차단되었습니다.");

    const badWords = ["욕설", "비난", "바보"]; 
    const hasBadWord = badWords.some(word => postInput.includes(word));

    if (hasBadWord) {
      const currentWarning = (warnings[userName] || 0) + 1;
      setWarnings({ ...warnings, [userName]: currentWarning });
      alert(`[경고] 부적절한 언어가 포함되었습니다. (현재 경고: ${currentWarning}/3)`);
      
      if (currentWarning >= 3) {
        setBannedUsers([...bannedUsers, userName]);
        alert("경고 3회 누적으로 영구 차단됩니다.");
      }
      return;
    }

    setDailyPosts([{ name: userName, text: postInput, date: new Date().toLocaleTimeString() }, ...dailyPosts]);
    setPostInput("");
  };

  const addNewYear = () => {
    const lastYear = years[years.length - 1];
    const nextYear = prompt("새로운 년도를 입력하세요:", String(lastYear + 1));
    if (nextYear && !isNaN(Number(nextYear))) setYears([...years, parseInt(nextYear)]);
  };

  const addNotice = () => {
    if (!noticeInput.trim()) return;
    setNotices([...notices, { id: Date.now(), text: noticeInput }]);
    setNoticeInput("");
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#020617', color: '#22d3ee', padding: '20px', fontFamily: 'sans-serif' }}>
      <header style={{ maxWidth: '1000px', margin: '0 auto 30px', textAlign: 'center', borderBottom: '1px solid #155e75', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', letterSpacing: '-1px', margin: '0 0 10px 0' }}>
          ⚡ FUTURE ENGINEERING CLASS ⚡
        </h1>
        <div style={{ fontSize: '0.8rem', color: '#0891b2', letterSpacing: '2px' }}>
          {isAdmin ? "SYSTEM STATUS: ADMIN ACCESS GRANTED" : "SYSTEM STATUS: STUDENT ACCESS"}
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* 메인 년도별 사진 영역 */}
        <section style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', margin: 0 }}>
              <Camera size={20} /> YEARLY ARCHIVE
            </h2>
            <select 
              style={{ backgroundColor: '#1e293b', color: '#22d3ee', border: '1px solid #0891b2', padding: '5px 10px', borderRadius: '4px' }}
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {years.map(y => <option key={y} value={y}>{y}년</option>)}
            </select>
          </div>
          
          <div 
            onClick={() => triggerUpload('main-photo')}
            style={{ height: '200px', border: '2px dashed #155e75', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#020617' }}
          >
            <PlusCircle size={40} style={{ marginBottom: '10px' }} />
            <p style={{ margin: 0, fontWeight: 'bold' }}>{selectedYear}년도 사진을 넣어주세요 (클릭)</p>
            <input type="file" id="main-photo" style={{ display: 'none' }} />
          </div>
        </section>

        {/* 3단 리스트 구성 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {/* 1. 학급 소개 */}
          <article style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginTop: 0 }}>
              <User size={18} /> CLASS MEMBERS ({selectedYear})
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} style={{ backgroundColor: '#020617', padding: '10px', borderRadius: '6px', textAlign: 'center', border: '1px solid #1e293b' }}>
                  <div onClick={() => triggerUpload(`std-${i}`)} style={{ cursor: 'pointer', fontSize: '0.7rem', color: '#0891b2', marginBottom: '5px' }}>사진을 넣어주세요</div>
                  <input type="file" id={`std-${i}`} style={{ display: 'none' }} />
                  <input type="text" placeholder="학생 이름" style={{ width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #1e293b', color: '#fff', textAlign: 'center', fontSize: '0.8rem' }} />
                </div>
              ))}
            </div>

            <h4 style={{ color: '#60a5fa', fontSize: '0.9rem', marginBottom: '8px' }}>TEACHERS</h4>
            <div style={{ backgroundColor: '#020617', padding: '10px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #1e293b' }}>
              <div onClick={() => triggerUpload('teacher')} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.6rem' }}>사진</div>
              <input type="file" id="teacher" style={{ display: 'none' }} />
              <input type="text" placeholder="선생님 성함" style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #1e293b', color: '#fff', fontSize: '0.8rem' }} />
            </div>

            {isAdmin && selectedYear >= 2027 && (
              <button onClick={addNewYear} style={{ width: '100%', marginTop: '15px', padding: '8px', backgroundColor: '#155e75', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                + 년도 직접 입력 창 추가
              </button>
            )}
          </article>

          {/* 2. 소식 누리집 */}
          <article style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginTop: 0 }}>
              <Bell size={18} /> NEWS PORTAL
            </h3>
            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ color: '#fb923c', fontSize: '0.8rem', margin: '0 0 8px 0' }}>NOTICE / BULLETIN</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem' }}>
                {notices.map(n => (
                  <li key={n.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #1e293b' }}>
                    <span>• {n.text}</span>
                    {isAdmin && <Trash2 size={14} style={{ color: '#ef4444', cursor: 'pointer' }} onClick={() => setNotices(notices.filter(item => item.id !== n.id))} />}
                  </li>
                ))}
              </ul>
            </div>
            {isAdmin && (
              <div style={{ display: 'flex', gap: '5px' }}>
                <input type="text" value={noticeInput} onChange={(e) => setNoticeInput(e.target.value)} placeholder="공지사항 작성" style={{ flex: 1, backgroundColor: '#020617', border: '1px solid #1e293b', color: '#fff', padding: '5px', borderRadius: '4px', fontSize: '0.8rem' }} />
                <button onClick={addNotice} style={{ backgroundColor: '#0284c7', border: 'none', color: '#fff', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>등록</button>
              </div>
            )}
          </article>

          {/* 3. 하루 글 */}
          <article style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginTop: 0 }}>
              <MessageSquare size={18} /> DAILY LOG
            </h3>
            <div style={{ backgroundColor: '#020617', padding: '10px', borderRadius: '6px', marginBottom: '15px', border: '1px solid #1e293b' }}>
              <input type="text" placeholder="작성자 이름" value={userName} onChange={(e) => setUserName(e.target.value)} style={{ width: '100%', backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid #1e293b', color: '#fff', marginBottom: '8px', fontSize: '0.8rem' }} />
              <textarea placeholder="하고 싶은 말 (욕설/비난 시 경고)" value={postInput} onChange={(e) => setPostInput(e.target.value)} style={{ width: '100%', backgroundColor: 'transparent', border: 'none', color: '#fff', resize: 'none', height: '50px', fontSize: '0.8rem' }}></textarea>
              <button onClick={submitDailyPost} style={{ width: '100%', backgroundColor: '#0891b2', border: 'none', color: '#000', fontWeight: 'bold', padding: '6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>작성하기</button>
            </div>
            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
              {dailyPosts.map((p, i) => (
                <div key={i} style={{ padding: '6px', borderLeft: '2px solid #22d3ee', backgroundColor: '#020617', marginBottom: '6px', borderRadius: '0 4px 4px 0' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>{p.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{p.text}</div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}