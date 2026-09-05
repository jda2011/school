'use client';

import { useState } from 'react';

export default function News() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [notices, setNotices] = useState([]);
  const [newsList, setNewsList] = useState([]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#0f172a', color: '#fff', minHeight: '100vh' }}>
      <h1>📢 소식 누리집</h1>
      
      {/* 관리자 권한 토글 (테스트용) */}
      <button onClick={() => setIsAdmin(!isAdmin)} style={{ marginBottom: '20px' }}>
        관리자 권한 변경 (현재: {isAdmin ? '관리자' : '일반 사용자'})
      </button>

      <h2>공지 사항</h2>
      {isAdmin && <button>공지사항 작성</button>}
      <ul>
        {notices.length === 0 ? <li>등록된 공지가 없습니다.</li> : null}
      </ul>

      <h2>소식 게시판</h2>
      {isAdmin && <button>소식 작성</button>}
      <ul>
        {newsList.length === 0 ? <li>등록된 소식이 없습니다.</li> : null}
      </ul>
    </div>
  );
}