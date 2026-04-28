    (function () {
      'use strict';

      const STORAGE_KEY = 'character-codex-editable-v2';
      const REF_STORAGE_KEY = 'character-codex-reference-images-v1';
      const WORKSPACE_STORAGE_KEY = 'character-codex-workspaces-v1';
      const LAST_EXPORT_STORAGE_KEY = 'character-codex-last-export-html-v1';
      const LOCAL_EXPORT_ENDPOINT = 'http://127.0.0.1:53175/export';
      const BRIEF_CONTENT_STORAGE_KEY = 'character-codex-brief-content-v1';

      const BRIEF_CHARACTER_CONTENT = {
        'overview-description': '세 캐릭터가 하나의 반복 구조를 나눠 맡는 기준 문서다. 개요는 전제, 관계는 연결, 루프는 진행, 도감은 세부 디자인을 정리한다.',
        'stat-1-v': '경험, 흔적, 기록이 일부만 이어진다',
        'stat-1-p': '같은 존재가 돌아오는 것이 아니라 필요한 일부만 다음 반복으로 넘어간다.',
        'stat-2-p': '플레이어는 LYRA로 경험하고, PIP의 행동을 의심하며, RELAY에서 구조를 확인한다.',
        'rule-1-title': '한 줄 구조',
        'rule-1-body': 'LYRA는 경험, PIP은 흔적, RELAY는 기록을 맡는다.',
        'rule-2-title': '읽는 순서',
        'rule-2-body': '감정으로 시작하고, 행동을 관찰한 뒤, 기록으로 확정한다.',
        'rule-3-title': '핵심 제한',
        'rule-3-body': '완전한 복원은 없고, 손실을 포함한 일부만 이어진다.',
        'aria-summary': 'LYRA는 플레이어가 직접 경험하는 시작점이다.',
        'aria-detail-1': '인간처럼 보이지만 반복 속에서 교체되는 존재다.',
        'aria-detail-2': '감정, 선택, 실패가 LYRA를 통해 입력된다.',
        'aria-detail-3': '기억은 일부만 남고 대부분은 끊긴다.',
        'aria-detail-4': '반복 구조의 경험 담당.',
        'trace-summary': 'PIP은 과거 선택을 행동으로 보여주는 단서다.',
        'trace-detail-1': '이전 LYRA들의 흔적을 몸짓으로 보존한다.',
        'trace-detail-2': '멈춤, 시선, 반복 동선이 메시지가 된다.',
        'trace-detail-3': '언어 대신 행동으로 기억을 전달한다.',
        'trace-detail-4': '반복 구조의 흔적 담당.',
        'vault-summary': 'RELAY는 사건을 저장하고 일부만 넘기는 장치다.',
        'vault-detail-1': '반복의 연속성을 유지하는 기계 장치다.',
        'vault-detail-2': '기록은 저장되고 압축되며 일부만 복원된다.',
        'vault-detail-3': '해석하지 않고 필요한 사실만 남긴다.',
        'vault-detail-4': '반복 구조의 기록 담당.',
        'card-aria-body': '플레이어가 세계를 체험하는 통로.',
        'card-trace-body': '과거 선택이 남긴 행동의 자취.',
        'card-vault-body': '사라지는 경험을 일부 보존하는 장치.',
        'link-1-body': 'LYRA의 경험은 PIP의 행동 단서로 남는다.',
        'link-2-body': 'PIP의 단서는 RELAY에서 기록으로 정리된다.',
        'link-3-body': 'RELAY의 기록 일부가 다음 LYRA로 넘어간다.',
        'character-168': '관계 구조가 실제 플레이 순서로 작동하는 방식이다.',
        'character-170': '플레이어는 LYRA로 세계를 경험한다.',
        'character-172': '남은 감정과 선택은 PIP의 행동으로 드러난다.',
        'character-174': 'PIP의 단서는 RELAY에 기록된다.',
        'character-176': '기록은 압축되고 일부만 다음 반복으로 넘어간다.',
        'character-178': '새 LYRA는 익숙함만 일부 지닌 채 시작한다.',
        'character-180': '플레이어는 반복이 복원이 아니라 전달임을 이해한다.',
        'dossier-aria-desc': '플레이어가 직접 조작하는 인간형 주체.',
        'character-116': '역할',
        'character-117': '경험의 중심',
        'character-118': '위험, 감정, 상실, 발견을 직접 체험한다.',
        'character-119': '인식',
        'character-120': '자기 인식의 오류',
        'character-121': '스스로를 인간이라 믿지만 반복의 진실은 모른다.',
        'character-122': '디자인 규칙',
        'character-123': '완전한 인간성',
        'character-124': '노골적인 SF 기호 없이 인간처럼 보여야 한다.',
        'character-125': '플레이어 경험',
        'character-126': '정체성의 해체',
        'character-127': '처음에는 인간으로 받아들이지만 점차 동일한 존재가 아님을 깨닫는다.',
        'dossier-trace-desc': '행동으로 남은 기억을 읽게 하는 비언어적 단서.',
        'character-135': '역할',
        'character-136': '흔적의 매개체',
        'character-137': '이전 선택의 잔재를 동선과 반응으로 보여준다.',
        'character-138': '인식',
        'character-139': '단순 생물처럼 보임',
        'character-140': '처음에는 동물처럼 보이지만 행동이 반복의 단서가 된다.',
        'character-141': '디자인 규칙',
        'character-142': '귀엽지만 불안한 동물성',
        'character-143': '친근함 안에 설명되지 않는 지능과 반복성을 남긴다.',
        'character-144': '플레이어 경험',
        'character-145': '관찰의 전환',
        'character-146': '귀여움에서 의심으로, 의심에서 구조 인지로 이동한다.',
        'dossier-vault-desc': '기록을 보관하고 일부만 다음 반복으로 넘기는 장치.',
        'character-154': '역할',
        'character-155': '기록과 전달',
        'character-156': '사건을 저장하고 다음 반복에 필요한 일부만 남긴다.',
        'character-157': '인식',
        'character-158': '도구처럼 보임',
        'character-159': '감정 없이 작동하지만 반복의 진실을 가장 직접적으로 드러낸다.',
        'character-160': '디자인 규칙',
        'character-161': '정직한 기계성',
        'character-162': '노출된 구조와 코어로 기능이 바로 읽혀야 한다.',
        'character-163': '플레이어 경험',
        'character-164': '진실의 확정',
        'character-165': '감각적으로 느낀 이상함을 구조적 사실로 정리한다.'
      };

      let lightboxState = { group: '', index: 0 };
      const workspaceMeta = {
        character: {
          brandEyebrow: 'Capital 기록',
          brandTitle: 'Character Codex',
          statusTitle: '데이터 동기화',
          statusSub: '캐릭터 워크스페이스'
        },
        environment: {
          brandEyebrow: 'Outland 환경',
          brandTitle: 'Environment Codex',
          statusTitle: '데이터 동기화',
          statusSub: '환경 워크스페이스'
        }
      };

      function byId(id) {
        return document.getElementById(id);
      }

      function getWorkspaceStore() {
        try {
          const raw = localStorage.getItem(WORKSPACE_STORAGE_KEY);
          const parsed = raw ? JSON.parse(raw) : [];
          return Array.isArray(parsed) ? parsed : [];
        } catch (error) {
          console.error('워크스페이스 데이터 복원 실패', error);
          return [];
        }
      }

      function saveWorkspaceStore(list) {
        localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(list));
      }

      function getWorkspaceLabel(target) {
        return document.querySelector(`.workspace-tab[data-workspace-target="${target}"]`)?.textContent?.trim() || 'Workspace';
      }

      function initTabs() {
        const tabButtons = Array.from(document.querySelectorAll('.tab-btn[data-screen-target]'));
        if (!tabButtons.length) return;

        tabButtons.forEach((button) => {
          button.addEventListener('click', () => {
            const target = button.dataset.screenTarget;
            const activePane = document.querySelector('.workspace-pane.active');
            if (!activePane || !target) return;
            const screens = Array.from(activePane.querySelectorAll('.screen[data-screen]'));
            const targetScreen = activePane.querySelector(`.screen[data-screen="${target}"]`);
            if (!targetScreen) return;

            tabButtons.forEach((btn) => btn.classList.remove('active'));
            screens.forEach((screen) => screen.classList.remove('active'));
            button.classList.add('active');
            targetScreen.classList.add('active');

            if (target === 'dossiers' || target === 'behaviors') {
              activateFirstDossierInPane(targetScreen);
            }
          });
        });
      }

      function mergeLoopSectionsIntoRelationships() {
        document.querySelectorAll('.tab-btn[data-screen-target="loop"]').forEach((button) => button.remove());

        document.querySelectorAll('.workspace-pane[data-workspace-pane]').forEach((pane) => {
          const relationshipScreen = pane.querySelector('.screen[data-screen="relationships"]');
          const loopScreen = pane.querySelector('.screen[data-screen="loop"]');
          if (!relationshipScreen || !loopScreen) return;

          const loopSection = document.createElement('div');
          loopSection.className = 'relationship-loop-section';
          while (loopScreen.firstChild) {
            loopSection.appendChild(loopScreen.firstChild);
          }

          const relationshipBody = relationshipScreen.querySelector('.relations-layout') || relationshipScreen;
          relationshipBody.appendChild(loopSection);

          if (loopScreen.classList.contains('active')) {
            loopScreen.classList.remove('active');
            relationshipScreen.classList.add('active');
          }

          loopScreen.remove();
        });
      }

      function syncTopTabsForPane(pane) {
        const screens = Array.from(pane.querySelectorAll('.screen[data-screen]'));
        const activeScreen = screens.find((screen) => screen.classList.contains('active')) || screens[0];
        const target = activeScreen ? activeScreen.dataset.screen : 'overview';
        document.querySelectorAll('.tab-btn[data-screen-target]').forEach((btn) => {
          btn.classList.toggle('active', btn.dataset.screenTarget === target);
        });
      }

      function updateWorkspaceHeader(target) {
        const brandEyebrow = byId('brand-eyebrow-text');
        const brandTitle = byId('brand-title-text');
        const statusTitle = byId('status-title-text');
        const statusSub = byId('status-sub-text');
        if (!brandEyebrow || !brandTitle || !statusTitle || !statusSub) return;

        const fallbackName = getWorkspaceLabel(target);
        const meta = workspaceMeta[target] || {
          brandEyebrow: `${fallbackName} 문서`,
          brandTitle: `${fallbackName} Codex`,
          statusTitle: '데이터 동기화',
          statusSub: `${fallbackName} Workspace`
        };

        brandEyebrow.textContent = meta.brandEyebrow;
        brandTitle.textContent = meta.brandTitle;
        statusTitle.textContent = meta.statusTitle;
        statusSub.textContent = meta.statusSub;
      }

      function makePaneEditable(pane, prefix) {
        const editableSelectors = 'h1, h2, h3, h4, p, strong, span, td, th';
        pane.querySelectorAll(editableSelectors).forEach((node, index) => {
          if (node.closest('script') || node.closest('style')) return;
          if (!node.hasAttribute('data-edit-key')) {
            node.setAttribute('data-edit-key', `${prefix}-${index}`);
          }
          node.setAttribute('contenteditable', 'true');
        });
      }

      function createWorkspacePane(name, key) {
        const pane = document.createElement('div');
        pane.className = 'workspace-pane';
        pane.dataset.workspacePane = key;
        pane.innerHTML = `
        <section class="screen active" data-screen="overview">
          <div class="hero">
            <section class="panel">
              <div class="chip">새 워크스페이스 개요</div>
              <h1 class="hero-title">${name.toUpperCase()}</h1>
              <p class="sub">이 워크스페이스는 ${name} 설정을 위한 기본 문서이다. 개요, 관계, 도감, 행동 패턴, 루프 구조를 자유롭게 편집할 수 있다.</p>
              <div class="label-row"><span class="chip">개요</span><span class="chip">관계</span><span class="chip">도감</span><span class="chip">행동 패턴</span><span class="chip">루프</span></div>
            </section>
            <aside class="hero-side">
              <div class="stat-box"><div class="k">핵심 규칙</div><div class="v">새 워크스페이스</div><p>이 영역을 클릭해서 텍스트를 자유롭게 수정할 수 있다.</p></div>
              <div class="stat-box"><div class="k">플레이어 인식</div><div class="v">편집 가능 구조</div><p>기본 문서 구조는 유지하면서 내용만 교체하는 방식으로 사용한다.</p></div>
            </aside>
          </div>
        </section>
        <section class="screen" data-screen="relationships">
          <div class="relationship-cards"><article class="relationship-card"><span class="k">NODE A</span><h3>관계 카드 A</h3><p>이 영역은 새 워크스페이스 관계 설명용 기본 카드다.</p></article><article class="relationship-card"><span class="k">NODE B</span><h3>관계 카드 B</h3><p>필요한 구조에 맞게 텍스트를 수정한다.</p></article><article class="relationship-card"><span class="k">NODE C</span><h3>관계 카드 C</h3><p>새 워크스페이스의 핵심 흐름을 요약한다.</p></article></div>
          <div class="relationship-loop-section"><div class="panel"><div class="section-head"><h2>루프 구조</h2><span class="caption">기본 구조</span></div><p>새 탭의 루프 구조를 여기서 정리한다.</p></div></div>
        </section>
        <section class="screen" data-screen="dossiers">
          <div class="dossier-layout">
            <aside class="side-nav">
              <h3>도감 선택</h3>
              <button class="nav-btn active" data-dossier-target="${key}-panel-a"><small>기본 엔트리</small>${name.toUpperCase()} A</button>
              <button class="nav-btn" data-dossier-target="${key}-panel-b"><small>기본 엔트리</small>${name.toUpperCase()} B</button>
              <button class="nav-btn" data-dossier-target="${key}-panel-c"><small>기본 엔트리</small>${name.toUpperCase()} C</button>
            </aside>
            <section class="dossier-view panel">
              <div class="dossier-scroll">
                <article class="dossier-panel active" id="${key}-panel-a">
                  <div class="dossier-header"><h2>${name.toUpperCase()} A</h2><div class="badge-stack"><span class="badge">기본 태그</span><span class="badge">편집 가능</span><span class="badge">이미지 카드</span></div><p>이 엔트리는 새 워크스페이스용 기본 도감 A다.</p></div>
                  <div class="reference-card" data-ref-group="${key}-a" data-ref-index="0">
                    <div class="reference-toolbar"><span class="ref-label">레퍼런스 이미지</span><div class="ref-actions"><button class="ref-btn" type="button" data-ref-action="prev">이전</button><button class="ref-btn" type="button" data-ref-action="next">다음</button><button class="ref-btn" type="button" data-ref-action="add">추가</button><button class="ref-btn" type="button" data-ref-action="delete">삭제</button></div></div>
                    <div class="reference-frame"><div class="reference-strip"></div><div class="reference-placeholder">${name.toUpperCase()} A 레퍼런스 이미지를 이 영역에 추가</div></div>
                    <div class="reference-meta"><span class="ref-counter">0 / 0</span></div>
                    <input class="ref-file-input" type="file" accept="image/*" multiple />
                  </div>
                  <div class="dossier-grid"><div class="feature-card"><span class="k">역할</span><h4>기본 설명 A</h4><p>이 영역을 클릭해서 새 엔트리 설명을 수정한다.</p></div><div class="feature-card"><span class="k">인상</span><h4>기본 설명</h4><p>레퍼런스 이미지와 함께 사용할 수 있는 기본 카드다.</p></div></div>
                </article>
                <article class="dossier-panel" id="${key}-panel-b" hidden>
                  <div class="dossier-header"><h2>${name.toUpperCase()} B</h2><div class="badge-stack"><span class="badge">기본 태그</span><span class="badge">편집 가능</span><span class="badge">이미지 카드</span></div><p>이 엔트리는 새 워크스페이스용 기본 도감 B다.</p></div>
                  <div class="reference-card" data-ref-group="${key}-b" data-ref-index="0">
                    <div class="reference-toolbar"><span class="ref-label">레퍼런스 이미지</span><div class="ref-actions"><button class="ref-btn" type="button" data-ref-action="prev">이전</button><button class="ref-btn" type="button" data-ref-action="next">다음</button><button class="ref-btn" type="button" data-ref-action="add">추가</button><button class="ref-btn" type="button" data-ref-action="delete">삭제</button></div></div>
                    <div class="reference-frame"><div class="reference-strip"></div><div class="reference-placeholder">${name.toUpperCase()} B 레퍼런스 이미지를 이 영역에 추가</div></div>
                    <div class="reference-meta"><span class="ref-counter">0 / 0</span></div>
                    <input class="ref-file-input" type="file" accept="image/*" multiple />
                  </div>
                  <div class="dossier-grid"><div class="feature-card"><span class="k">역할</span><h4>기본 설명 B</h4><p>이 영역을 클릭해서 새 엔트리 설명을 수정한다.</p></div><div class="feature-card"><span class="k">인상</span><h4>기본 설명</h4><p>레퍼런스 이미지와 함께 사용할 수 있는 기본 카드다.</p></div></div>
                </article>
                <article class="dossier-panel" id="${key}-panel-c" hidden>
                  <div class="dossier-header"><h2>${name.toUpperCase()} C</h2><div class="badge-stack"><span class="badge">기본 태그</span><span class="badge">편집 가능</span><span class="badge">이미지 카드</span></div><p>이 엔트리는 새 워크스페이스용 기본 도감 C다.</p></div>
                  <div class="reference-card" data-ref-group="${key}-c" data-ref-index="0">
                    <div class="reference-toolbar"><span class="ref-label">레퍼런스 이미지</span><div class="ref-actions"><button class="ref-btn" type="button" data-ref-action="prev">이전</button><button class="ref-btn" type="button" data-ref-action="next">다음</button><button class="ref-btn" type="button" data-ref-action="add">추가</button><button class="ref-btn" type="button" data-ref-action="delete">삭제</button></div></div>
                    <div class="reference-frame"><div class="reference-strip"></div><div class="reference-placeholder">${name.toUpperCase()} C 레퍼런스 이미지를 이 영역에 추가</div></div>
                    <div class="reference-meta"><span class="ref-counter">0 / 0</span></div>
                    <input class="ref-file-input" type="file" accept="image/*" multiple />
                  </div>
                  <div class="dossier-grid"><div class="feature-card"><span class="k">역할</span><h4>기본 설명 C</h4><p>이 영역을 클릭해서 새 엔트리 설명을 수정한다.</p></div><div class="feature-card"><span class="k">인상</span><h4>기본 설명</h4><p>레퍼런스 이미지와 함께 사용할 수 있는 기본 카드다.</p></div></div>
                </article>
              </div>
            </section>
          </div>
        </section>
        <section class="screen" data-screen="behaviors">
          <div class="panel"><div class="section-head"><h2>행동 패턴</h2><span class="caption">기본 구조</span></div><p>${name}의 행동 패턴을 여기서 정리한다.</p></div>
        </section>`;
        makePaneEditable(pane, `workspace-${key}`);
        return pane;
      }

      function initWorkspaceTabs() {
        const addButton = byId('add-workspace-btn');
        const container = document.querySelector('main');
        if (!addButton || !container) return;

        const stored = getWorkspaceStore();
        stored.forEach((item) => {
          if (!item || !item.key || !item.name) return;
          if (document.querySelector(`.workspace-pane[data-workspace-pane="${item.key}"]`)) return;

          workspaceMeta[item.key] = {
            brandEyebrow: `${item.name} 문서`,
            brandTitle: `${item.name} Codex`,
            statusTitle: '데이터 동기화',
            statusSub: `${item.name} 워크스페이스`
          };

          const pane = createWorkspacePane(item.name, item.key);
          container.appendChild(pane);

          const newButton = document.createElement('button');
          newButton.className = 'workspace-tab';
          newButton.type = 'button';
          newButton.dataset.workspaceTarget = item.key;
          newButton.textContent = item.name;
          addButton.parentElement.insertBefore(newButton, addButton);
        });

        const activateWorkspace = (target) => {
          const nextPane = document.querySelector(`.workspace-pane[data-workspace-pane="${target}"]`);
          if (!nextPane) return;
          document.querySelectorAll('.workspace-pane[data-workspace-pane]').forEach((pane) => pane.classList.remove('active'));
          document.querySelectorAll('.workspace-tab[data-workspace-target]').forEach((btn) => btn.classList.toggle('active', btn.dataset.workspaceTarget === target));
          nextPane.classList.add('active');
          syncTopTabsForPane(nextPane);
          updateWorkspaceHeader(target);
          const activeScreen = nextPane.querySelector('.screen.active[data-screen]');
          if (activeScreen && activeScreen.dataset.screen === 'dossiers') {
            activateFirstDossierInPane(nextPane);
          }
        };

        const bindWorkspaceButton = (button) => {
          button.addEventListener('click', () => activateWorkspace(button.dataset.workspaceTarget));
          button.addEventListener('dblclick', () => {
            const key = button.dataset.workspaceTarget;
            if (!key || key === 'character' || key === 'environment') return;
            const nextName = window.prompt('탭 이름을 입력하세요.', button.textContent?.trim() || '새 탭');
            if (!nextName) return;
            const safeName = nextName.trim();
            if (!safeName) return;
            button.textContent = safeName;
            workspaceMeta[key] = {
              brandEyebrow: `${safeName} 문서`,
              brandTitle: `${safeName} Codex`,
              statusTitle: '데이터 동기화',
              statusSub: `${safeName} 워크스페이스`
            };
            const list = getWorkspaceStore().map((item) => item.key === key ? { ...item, name: safeName } : item);
            saveWorkspaceStore(list);
            if (button.classList.contains('active')) {
              updateWorkspaceHeader(key);
            }
          });
        };

        document.querySelectorAll('.workspace-tab[data-workspace-target]').forEach(bindWorkspaceButton);

        addButton.addEventListener('click', () => {
          const count = document.querySelectorAll('.workspace-pane[data-workspace-pane]').length + 1;
          const key = `workspace-${count}`;
          const name = `새 탭 ${count - 2}`;
          workspaceMeta[key] = {
            brandEyebrow: `${name} 문서`,
            brandTitle: `${name} Codex`,
            statusTitle: '데이터 동기화',
            statusSub: `${name} 워크스페이스`
          };
          const pane = createWorkspacePane(name, key);
          container.appendChild(pane);

          const newButton = document.createElement('button');
          newButton.className = 'workspace-tab';
          newButton.type = 'button';
          newButton.dataset.workspaceTarget = key;
          newButton.textContent = name;
          addButton.parentElement.insertBefore(newButton, addButton);
          bindWorkspaceButton(newButton);

          const list = getWorkspaceStore();
          list.push({ key, name });
          saveWorkspaceStore(list);

          initDossiers();
          initReferenceCards();
          activateWorkspace(key);
        });

        activateWorkspace('character');
      }

      function initRelationshipPanel() {
        const relNodes = Array.from(document.querySelectorAll('.ring-node[data-rel], .node[data-rel]'));
        const relPanels = Array.from(document.querySelectorAll('[data-rel-panel]'));
        const relationshipLoop = byId('relationship-loop');
        const relationshipDetail = byId('relationship-detail');
        if (!relNodes.length || !relPanels.length) return;

        const activate = (target) => {
          if (!target) return;
          relNodes.forEach((n) => n.classList.remove('active'));
          relPanels.forEach((panel) => {
            panel.hidden = true;
            panel.classList.remove('active');
          });

          const activeNode = relNodes.find((n) => n.dataset.rel === target);
          const activePanel = relPanels.find((p) => p.dataset.relPanel === target);

          if (activeNode) activeNode.classList.add('active');
          if (activePanel) {
            activePanel.hidden = false;
            activePanel.classList.add('active');
          }

          if (relationshipLoop) {
            relationshipLoop.classList.remove('theme-aria', 'theme-trace', 'theme-vault');
            relationshipLoop.classList.add(`theme-${target}`);
          }
          if (relationshipDetail) {
            relationshipDetail.classList.remove('theme-aria', 'theme-trace', 'theme-vault');
            relationshipDetail.classList.add(`theme-${target}`);
          }
        };

        relNodes.forEach((node) => {
          node.addEventListener('click', () => activate(node.dataset.rel));
          node.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              activate(node.dataset.rel);
            }
          });
        });

        activate('aria');
      }

      function activateDossierInPane(container, target) {
        if (!container || !target) return;
        const buttons = Array.from(container.querySelectorAll('.nav-btn[data-dossier-target]'));
        const panels = Array.from(container.querySelectorAll('.dossier-panel'));
        const activePanel = byId(target);
        if (!buttons.length || !panels.length || !activePanel || !container.contains(activePanel)) return;

        buttons.forEach((btn) => {
          btn.classList.toggle('active', btn.dataset.dossierTarget === target);
        });
        panels.forEach((panel) => {
          panel.classList.remove('active');
          panel.hidden = true;
        });
        activePanel.hidden = false;
        activePanel.classList.add('active');
      }

      function activateFirstDossierInPane(container) {
        if (!container) return;
        const firstButton = container.querySelector('.nav-btn[data-dossier-target]');
        if (!firstButton) return;
        activateDossierInPane(container, firstButton.dataset.dossierTarget);
      }

      function initDossiers() {
        const containers = Array.from(document.querySelectorAll('.screen[data-screen="dossiers"], .screen[data-screen="behaviors"]'));
        containers.forEach((container) => {
          const buttons = Array.from(container.querySelectorAll('.nav-btn[data-dossier-target]'));
          if (!buttons.length) return;

          buttons.forEach((button) => {
            button.addEventListener('click', () => {
              activateDossierInPane(container, button.dataset.dossierTarget);
            });
          });

          activateFirstDossierInPane(container);
        });
      }

      function initLoopDetailButtons() {
        document.querySelectorAll('.loop-flow-card').forEach((card) => {
          const button = card.querySelector('.loop-detail-btn');
          const note = card.querySelector('.loop-flow-note');
          if (!(button instanceof HTMLButtonElement) || !(note instanceof HTMLElement)) return;

          card.classList.toggle('is-expanded', !note.hasAttribute('hidden'));

          button.addEventListener('click', () => {
            const isHidden = note.hasAttribute('hidden');
            if (isHidden) {
              note.removeAttribute('hidden');
              card.classList.add('is-expanded');
              button.textContent = '상세 닫기';
              button.setAttribute('aria-expanded', 'true');
            } else {
              note.setAttribute('hidden', '');
              card.classList.remove('is-expanded');
              button.textContent = '루프 상세 보기';
              button.setAttribute('aria-expanded', 'false');
            }
          });
        });
      }

      function initEditable() {
        const editableNodes = Array.from(document.querySelectorAll('[data-edit-key]'));
        editableNodes.forEach((node) => node.setAttribute('contenteditable', 'true'));
        document.querySelectorAll('.workspace-pane[data-workspace-pane]').forEach((pane) => {
          makePaneEditable(pane, pane.dataset.workspacePane || 'workspace');
        });
      }

      function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result || ''));
          reader.onerror = () => reject(reader.error || new Error('파일 읽기 실패'));
          reader.readAsDataURL(file);
        });
      }

      function loadImage(src) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('이미지 로드 실패'));
          img.src = src;
        });
      }

      async function optimizeImageFile(file) {
        const dataUrl = await readFileAsDataURL(file);
        const img = await loadImage(dataUrl);
        const maxWidth = 1600;
        const scale = Math.min(1, maxWidth / Math.max(1, img.width));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return dataUrl;
        ctx.drawImage(img, 0, 0, width, height);
        return canvas.toDataURL('image/webp', 0.82);
      }

      function getReferenceStore() {
        const embeddedStore = getEmbeddedReferenceStore();
        const embeddedNode = document.querySelector('#embedded-reference-store');
        if (embeddedNode?.dataset.exportMode === 'folder') return embeddedStore;
        try {
          const raw = localStorage.getItem(REF_STORAGE_KEY);
          const parsed = raw ? JSON.parse(raw) : {};
          if (parsed && typeof parsed === 'object' && Object.keys(parsed).length) return parsed;
          return embeddedStore;
        } catch (error) {
          console.error('레퍼런스 데이터 복원 실패', error);
          return embeddedStore;
        }
      }

      function saveReferenceStore(store) {
        try {
          localStorage.setItem(REF_STORAGE_KEY, JSON.stringify(store));
          embedReferenceStore(document.documentElement, store);
          return true;
        } catch (error) {
          console.error('레퍼런스 저장 실패', error);
          alert('이미지 저장 용량이 부족합니다. 이미지 크기를 줄이거나 일부 이미지를 삭제해 주세요.');
          return false;
        }
      }

      function getEmbeddedReferenceStore(root = document) {
        const node = root.querySelector('#embedded-reference-store');
        if (!node) return {};
        try {
          const parsed = JSON.parse(node.textContent || '{}');
          return parsed && typeof parsed === 'object' ? parsed : {};
        } catch (error) {
          console.error('내장 레퍼런스 데이터 복원 실패', error);
          return {};
        }
      }

      function embedReferenceStore(root, store, options = {}) {
        const doc = root.ownerDocument || document;
        let node = root.querySelector('#embedded-reference-store');
        if (!node) {
          node = doc.createElement('script');
          node.id = 'embedded-reference-store';
          node.type = 'application/json';
          const body = root.querySelector('body');
          (body || root).appendChild(node);
        }
        if (options.exportMode) {
          node.dataset.exportMode = options.exportMode;
        } else {
          node.removeAttribute('data-export-mode');
        }
        node.textContent = JSON.stringify(store || {}).replace(/</g, '\\u003c');
      }

      function renderReferenceCard(card, store) {
        const group = card.dataset.refGroup;
        const strip = card.querySelector('.reference-strip');
        const placeholder = card.querySelector('.reference-placeholder');
        const counter = card.querySelector('.ref-counter');
        if (!group || !strip || !placeholder || !counter) return;

        const items = Array.isArray(store[group]) ? store[group] : [];
        let index = Number(card.dataset.refIndex || 0);
        if (!Number.isFinite(index) || index < 0) index = 0;

        if (items.length === 0) {
          card.dataset.refIndex = '0';
          strip.innerHTML = '';
          placeholder.hidden = false;
          counter.textContent = '0 / 0';
          return;
        }

        if (index >= items.length) index = items.length - 1;
        card.dataset.refIndex = String(index);
        placeholder.hidden = true;

        strip.innerHTML = '';
        items.forEach((item, realIndex) => {
          const thumb = document.createElement('article');
          thumb.className = `reference-thumb${realIndex === index ? ' active' : ''}`;

          const preview = document.createElement('button');
          preview.type = 'button';
          preview.className = 'reference-thumb-preview';
          preview.dataset.refThumbIndex = String(realIndex);
          preview.setAttribute('aria-label', `${group} reference ${realIndex + 1}`);

          const img = document.createElement('img');
          img.src = item.src;
          img.alt = item.name || `${group} reference ${realIndex + 1}`;
          preview.appendChild(img);

          const badge = document.createElement('span');
          badge.className = 'reference-thumb-index';
          badge.textContent = `${realIndex + 1}`;
          preview.appendChild(badge);

          const caption = document.createElement('textarea');
          caption.className = 'reference-caption-input';
          caption.dataset.refCaptionIndex = String(realIndex);
          caption.placeholder = '이미지 설명';
          caption.rows = 2;
          caption.value = item.caption || '';
          caption.setAttribute('aria-label', `${group} reference ${realIndex + 1} 설명`);

          const orderTools = document.createElement('div');
          orderTools.className = 'reference-order-tools';

          const movePrev = document.createElement('button');
          movePrev.type = 'button';
          movePrev.className = 'reference-order-btn';
          movePrev.dataset.refMove = 'prev';
          movePrev.dataset.refMoveIndex = String(realIndex);
          movePrev.disabled = realIndex === 0;
          movePrev.textContent = '앞으로';

          const moveNext = document.createElement('button');
          moveNext.type = 'button';
          moveNext.className = 'reference-order-btn';
          moveNext.dataset.refMove = 'next';
          moveNext.dataset.refMoveIndex = String(realIndex);
          moveNext.disabled = realIndex === items.length - 1;
          moveNext.textContent = '뒤로';

          orderTools.appendChild(movePrev);
          orderTools.appendChild(moveNext);

          thumb.appendChild(preview);
          thumb.appendChild(caption);
          thumb.appendChild(orderTools);
          strip.appendChild(thumb);
        });

        counter.textContent = `${index + 1} / ${items.length}`;

        const activeThumb = strip.querySelector(`.reference-thumb-preview[data-ref-thumb-index="${index}"]`);
        if (activeThumb instanceof HTMLElement) {
          activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }

      function openLightbox(group, index) {
        const lightbox = byId('reference-lightbox');
        const image = byId('lightbox-image');
        const meta = byId('lightbox-meta');
        if (!lightbox || !image || !meta) return;

        const store = getReferenceStore();
        const items = Array.isArray(store[group]) ? store[group] : [];
        if (!items.length) return;

        let safeIndex = index;
        if (!Number.isFinite(safeIndex) || safeIndex < 0) safeIndex = 0;
        if (safeIndex >= items.length) safeIndex = items.length - 1;

        lightboxState = { group, index: safeIndex };
        image.src = items[safeIndex].src;
        image.alt = items[safeIndex].name || `${group} reference ${safeIndex + 1}`;
        meta.textContent = `${safeIndex + 1} / ${items.length}`;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
      }

      function closeLightbox() {
        const lightbox = byId('reference-lightbox');
        const image = byId('lightbox-image');
        if (!lightbox || !image) return;
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        image.removeAttribute('src');
      }

      function stepLightbox(direction) {
        const store = getReferenceStore();
        const items = Array.isArray(store[lightboxState.group]) ? store[lightboxState.group] : [];
        if (!items.length) return;
        const nextIndex = (lightboxState.index + direction + items.length) % items.length;
        openLightbox(lightboxState.group, nextIndex);
      }

      function initLightbox() {
        const lightbox = byId('reference-lightbox');
        const prevBtn = byId('lightbox-prev');
        const nextBtn = byId('lightbox-next');
        const image = byId('lightbox-image');
        if (!lightbox || !prevBtn || !nextBtn || !image) return;

        prevBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          stepLightbox(-1);
        });

        nextBtn.addEventListener('click', (event) => {
          event.stopPropagation();
          stepLightbox(1);
        });

        image.addEventListener('click', () => {
          closeLightbox();
        });

        lightbox.addEventListener('click', (event) => {
          if (event.target === lightbox) {
            closeLightbox();
          }
        });

        document.addEventListener('keydown', (event) => {
          if (!lightbox.classList.contains('active')) return;
          if (event.key === 'Escape') closeLightbox();
          if (event.key === 'ArrowLeft') stepLightbox(-1);
          if (event.key === 'ArrowRight') stepLightbox(1);
        });
      }

      function initReferenceCards() {
        const cards = Array.from(document.querySelectorAll('.reference-card[data-ref-group]'));
        if (!cards.length) return;

        const store = getReferenceStore();
        cards.forEach((card) => renderReferenceCard(card, store));

        cards.forEach((card) => {
          const fileInput = card.querySelector('.ref-file-input');
          card.addEventListener('input', (event) => {
            const target = event.target;
            if (!(target instanceof HTMLTextAreaElement)) return;
            const captionIndex = Number(target.dataset.refCaptionIndex);
            const group = card.dataset.refGroup;
            if (!group || !Number.isFinite(captionIndex)) return;

            const currentStore = getReferenceStore();
            const items = Array.isArray(currentStore[group]) ? currentStore[group] : [];
            if (!items[captionIndex]) return;

            items[captionIndex] = {
              ...items[captionIndex],
              caption: target.value
            };
            currentStore[group] = items;
            saveReferenceStore(currentStore);
          });

          card.addEventListener('click', async (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;

            const moveButton = target.closest('[data-ref-move]');
            if (moveButton instanceof HTMLButtonElement) {
              const group = card.dataset.refGroup;
              const move = moveButton.dataset.refMove;
              const moveIndex = Number(moveButton.dataset.refMoveIndex);
              if (!group || !Number.isFinite(moveIndex)) return;

              const currentStore = getReferenceStore();
              const items = Array.isArray(currentStore[group]) ? currentStore[group] : [];
              const targetIndex = move === 'prev' ? moveIndex - 1 : moveIndex + 1;
              if (!items[moveIndex] || targetIndex < 0 || targetIndex >= items.length) return;

              [items[moveIndex], items[targetIndex]] = [items[targetIndex], items[moveIndex]];
              currentStore[group] = items;
              const saved = saveReferenceStore(currentStore);
              if (saved) {
                card.dataset.refIndex = String(targetIndex);
                renderReferenceCard(card, currentStore);
              }
              return;
            }

            const thumb = target.closest('[data-ref-thumb-index]');
            if (thumb instanceof HTMLElement) {
              const nextIndex = Number(thumb.dataset.refThumbIndex || 0);
              card.dataset.refIndex = String(nextIndex);
              renderReferenceCard(card, getReferenceStore());
              const group = card.dataset.refGroup;
              if (group) openLightbox(group, nextIndex);
              return;
            }

            const actionButton = target.closest('[data-ref-action]');
            if (!(actionButton instanceof HTMLElement)) return;

            const action = actionButton.dataset.refAction;
            const group = card.dataset.refGroup;
            if (!group) return;

            const currentStore = getReferenceStore();
            const items = Array.isArray(currentStore[group]) ? currentStore[group] : [];
            let index = Number(card.dataset.refIndex || 0);
            if (!Number.isFinite(index) || index < 0) index = 0;

            if (action === 'prev') {
              if (!items.length) return;
              const strip = card.querySelector('.reference-strip');
              if (strip instanceof HTMLElement) {
                strip.scrollBy({ left: -(strip.clientWidth * 0.8), behavior: 'smooth' });
              }
              index = Math.max(0, index - 1);
              card.dataset.refIndex = String(index);
              renderReferenceCard(card, currentStore);
              return;
            }

            if (action === 'next') {
              if (!items.length) return;
              const strip = card.querySelector('.reference-strip');
              if (strip instanceof HTMLElement) {
                strip.scrollBy({ left: strip.clientWidth * 0.8, behavior: 'smooth' });
              }
              index = Math.min(items.length - 1, index + 1);
              card.dataset.refIndex = String(index);
              renderReferenceCard(card, currentStore);
              return;
            }

            if (action === 'add') {
              if (fileInput) fileInput.click();
              return;
            }

            if (action === 'delete') {
              if (!items.length) return;
              items.splice(index, 1);
              currentStore[group] = items;
              saveReferenceStore(currentStore);
              if (index >= items.length) index = Math.max(0, items.length - 1);
              card.dataset.refIndex = String(index);
              renderReferenceCard(card, currentStore);
            }
          });

          if (fileInput) {
            fileInput.addEventListener('change', async () => {
              const group = card.dataset.refGroup;
              if (!group || !fileInput.files || !fileInput.files.length) return;
              const currentStore = getReferenceStore();
              const items = Array.isArray(currentStore[group]) ? currentStore[group] : [];
              const files = Array.from(fileInput.files);
              const dataList = await Promise.all(files.map(async (file) => ({
                name: file.name,
                src: await optimizeImageFile(file),
                caption: ''
              })));
              currentStore[group] = [...items, ...dataList];
              const saved = saveReferenceStore(currentStore);
              if (saved) {
                card.dataset.refIndex = String(Math.max(0, currentStore[group].length - 1));
                renderReferenceCard(card, currentStore);
              }
              fileInput.value = '';
            });
          }
        });
      }

      function saveEditableContent() {
        const payload = {};
        document.querySelectorAll('[data-edit-key]').forEach((node) => {
          payload[node.dataset.editKey] = node.innerHTML;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      }

      function loadEditableContent() {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        try {
          const payload = JSON.parse(raw);
          Object.entries(payload).forEach(([key, value]) => {
            const node = document.querySelector(`[data-edit-key="${key}"]`);
            if (node && typeof value === 'string') {
              node.innerHTML = value;
            }
          });
        } catch (error) {
          console.error('저장 데이터 복원 실패', error);
        }
      }

      function applyBriefCharacterContent() {
        const applyToDom = () => {
          Object.entries(BRIEF_CHARACTER_CONTENT).forEach(([key, value]) => {
            const node = document.querySelector(`[data-edit-key="${key}"]`);
            if (node) node.innerHTML = value;
          });
        };

        try {
          if (localStorage.getItem(BRIEF_CONTENT_STORAGE_KEY)) return;
          const raw = localStorage.getItem(STORAGE_KEY);
          const payload = raw ? JSON.parse(raw) : {};
          const nextPayload = {
            ...(payload && typeof payload === 'object' ? payload : {}),
            ...BRIEF_CHARACTER_CONTENT
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPayload));
          localStorage.setItem(BRIEF_CONTENT_STORAGE_KEY, 'applied');
          applyToDom();
        } catch (error) {
          console.error('간략 문구 적용 실패', error);
          applyToDom();
        }
      }

      function initSave() {
        const saveBtn = byId('save-btn');
        const exportBtn = byId('export-btn');
        const saveStatus = byId('save-status');
        if (!saveBtn || !saveStatus) return;
        let pendingExportDownloadUrl = null;

        const markDirty = () => {
          clearPendingExportDownload();
          saveStatus.textContent = '미저장';
        };

        let autoTimer = null;
        const autoSave = () => {
          if (autoTimer) clearTimeout(autoTimer);
          autoTimer = setTimeout(() => {
            saveEditableContent();
            saveStatus.textContent = '자동 저장';
          }, 800);
        };

        document.addEventListener('input', (event) => {
          if (event.target instanceof HTMLElement && event.target.matches('[data-edit-key]')) {
            markDirty();
            autoSave();
          }
        });

        saveBtn.addEventListener('click', () => {
          saveEditableContent();
          saveStatus.textContent = '저장 완료';
        });

        function createExportFileName() {
          const now = new Date();
          const pad = (n) => String(n).padStart(2, '0');
          const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}`;
          return `character_codex_${stamp}.html`;
        }

        function createExportFolderName() {
          return createExportFileName().replace(/\.html$/, '');
        }

        function sanitizePathPart(value, fallback = 'item') {
          const safe = String(value || '')
            .trim()
            .replace(/\.[^.]+$/, '')
            .replace(/[\\/:*?"<>|]+/g, '-')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
          return safe || fallback;
        }

        function getImageExtension(mimeType, name = '') {
          const fromName = String(name).match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase();
          if (fromName && ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(fromName)) {
            return fromName === 'jpeg' ? 'jpg' : fromName;
          }
          if (mimeType.includes('jpeg')) return 'jpg';
          if (mimeType.includes('png')) return 'png';
          if (mimeType.includes('gif')) return 'gif';
          if (mimeType.includes('svg')) return 'svg';
          return 'webp';
        }

        function dataUrlToBlob(dataUrl) {
          const [header, body] = String(dataUrl).split(',');
          const mimeType = header.match(/^data:([^;]+)/)?.[1] || 'application/octet-stream';
          const binary = atob(body || '');
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
          return { blob: new Blob([bytes], { type: mimeType }), mimeType };
        }

        async function sourceToBlob(src) {
          if (String(src).startsWith('data:')) return dataUrlToBlob(src);
          const response = await fetch(src);
          if (!response.ok) throw new Error(`Image fetch failed: ${src}`);
          const blob = await response.blob();
          return { blob, mimeType: blob.type || 'application/octet-stream' };
        }

        function clearPendingExportDownload() {
          if (!pendingExportDownloadUrl) return;
          URL.revokeObjectURL(pendingExportDownloadUrl);
          pendingExportDownloadUrl = null;
        }

        function setExportProgress(percent, label) {
          if (percent < 100) clearPendingExportDownload();
          const safePercent = Math.max(0, Math.min(100, Math.round(percent)));
          saveStatus.textContent = `${label} ${safePercent}%`;
        }

        async function updateExportProgress(percent, label) {
          setExportProgress(percent, label);
          await new Promise((resolve) => requestAnimationFrame(resolve));
        }

        async function readExportAsset(path, label) {
          const absoluteUrl = new URL(path, document.baseURI).href;
          try {
            const response = await fetch(absoluteUrl);
            if (!response.ok) throw new Error(`${label} export failed: ${path}`);
            return { absoluteUrl, text: await response.text() };
          } catch (error) {
            console.warn(`${label} inline export skipped`, error);
            return { absoluteUrl, text: null };
          }
        }

        async function inlineExportAssets(clone) {
          const doc = clone.ownerDocument || document;
          const styleLinks = Array.from(clone.querySelectorAll('link[rel="stylesheet"][href]'));
          for (const link of styleLinks) {
            const href = link.getAttribute('href');
            if (!href) continue;
            const asset = await readExportAsset(href, 'CSS');
            if (!asset.text) {
              link.setAttribute('href', asset.absoluteUrl);
              continue;
            }
            const style = doc.createElement('style');
            style.textContent = asset.text;
            link.replaceWith(style);
          }

          const scripts = Array.from(clone.querySelectorAll('script[src]'));
          for (const script of scripts) {
            const src = script.getAttribute('src');
            if (!src) continue;
            const asset = await readExportAsset(src, 'JS');
            if (!asset.text) {
              script.setAttribute('src', asset.absoluteUrl);
              continue;
            }
            const inlineScript = doc.createElement('script');
            inlineScript.textContent = asset.text;
            script.replaceWith(inlineScript);
          }
        }

        async function createReferenceExportBundle(referenceStore, onProgress = async () => {}) {
          const exportStore = {};
          const imageList = [];
          const imageFiles = [];
          const totalImages = Object.values(referenceStore || {})
            .filter(Array.isArray)
            .reduce((sum, items) => sum + items.filter((item) => item?.src).length, 0);
          let processedImages = 0;

          await onProgress(0, totalImages ? '이미지 정리 중' : '이미지 없음');

          for (const [group, items] of Object.entries(referenceStore || {})) {
            if (!Array.isArray(items)) continue;
            const safeGroup = sanitizePathPart(group, 'group');
            exportStore[group] = [];

            for (const [index, item] of items.entries()) {
              if (!item?.src) continue;
              try {
                const { blob, mimeType } = await sourceToBlob(item.src);
                const ext = getImageExtension(mimeType, item.name);
                const fileName = `${String(index + 1).padStart(3, '0')}-${sanitizePathPart(item.name, 'image')}.${ext}`;
                const imagePath = `images/${safeGroup}/${fileName}`;

                exportStore[group].push({
                  ...item,
                  src: imagePath
                });
                imageList.push({ group, name: item.name || fileName, path: imagePath, caption: item.caption || '' });
                imageFiles.push({ path: imagePath, blob });
              } catch (error) {
                console.warn('Image export skipped', { group, name: item.name, error });
              } finally {
                processedImages += 1;
                const percent = totalImages ? (processedImages / totalImages) * 100 : 100;
                await onProgress(percent, '이미지 정리 중');
              }
            }
          }

          return { exportStore, imageList, imageFiles };
        }

        async function getCleanExportHtml(referenceStore = getReferenceStore(), options = {}) {
          saveEditableContent();
          const clone = document.documentElement.cloneNode(true);
          clone.querySelectorAll('#export-modal').forEach((node) => node.remove());
          clone.querySelectorAll('#history-panel').forEach((node) => node.remove());
          clone.querySelectorAll('.lightbox.active').forEach((node) => node.classList.remove('active'));
          if (options.inlineAssets) await inlineExportAssets(clone);
          embedReferenceStore(clone, referenceStore, { exportMode: options.exportMode });
          return '<!DOCTYPE html>\n' + clone.outerHTML;
        }

        function getZipCrcTable() {
          if (getZipCrcTable.table) return getZipCrcTable.table;
          getZipCrcTable.table = Array.from({ length: 256 }, (_, index) => {
            let value = index;
            for (let bit = 0; bit < 8; bit += 1) {
              value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
            }
            return value >>> 0;
          });
          return getZipCrcTable.table;
        }

        function crc32(bytes) {
          const table = getZipCrcTable();
          let crc = 0xffffffff;
          for (const byte of bytes) crc = table[(crc ^ byte) & 0xff] ^ (crc >>> 8);
          return (crc ^ 0xffffffff) >>> 0;
        }

        function getZipDosDateTime(date = new Date()) {
          const year = Math.max(1980, date.getFullYear());
          const dosTime = (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2);
          const dosDate = ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate();
          return { dosDate, dosTime };
        }

        function createZipHeader(size, signature) {
          const bytes = new Uint8Array(size);
          new DataView(bytes.buffer).setUint32(0, signature, true);
          return bytes;
        }

        function concatBytes(chunks) {
          const total = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
          const output = new Uint8Array(total);
          let offset = 0;
          for (const chunk of chunks) {
            output.set(chunk, offset);
            offset += chunk.length;
          }
          return output;
        }

        async function createZipBlob(entries, onProgress = async () => {}) {
          const encoder = new TextEncoder();
          const localParts = [];
          const centralParts = [];
          let offset = 0;
          const { dosDate, dosTime } = getZipDosDateTime();
          let processedEntries = 0;

          await onProgress(0, 'ZIP 생성 중');

          for (const entry of entries) {
            const nameBytes = encoder.encode(entry.path.replace(/\\/g, '/'));
            const dataBytes = new Uint8Array(await entry.blob.arrayBuffer());
            const checksum = crc32(dataBytes);

            const localHeader = createZipHeader(30 + nameBytes.length, 0x04034b50);
            const localView = new DataView(localHeader.buffer);
            localView.setUint16(4, 20, true);
            localView.setUint16(6, 0x0800, true);
            localView.setUint16(8, 0, true);
            localView.setUint16(10, dosTime, true);
            localView.setUint16(12, dosDate, true);
            localView.setUint32(14, checksum, true);
            localView.setUint32(18, dataBytes.length, true);
            localView.setUint32(22, dataBytes.length, true);
            localView.setUint16(26, nameBytes.length, true);
            localHeader.set(nameBytes, 30);

            const centralHeader = createZipHeader(46 + nameBytes.length, 0x02014b50);
            const centralView = new DataView(centralHeader.buffer);
            centralView.setUint16(4, 20, true);
            centralView.setUint16(6, 20, true);
            centralView.setUint16(8, 0x0800, true);
            centralView.setUint16(10, 0, true);
            centralView.setUint16(12, dosTime, true);
            centralView.setUint16(14, dosDate, true);
            centralView.setUint32(16, checksum, true);
            centralView.setUint32(20, dataBytes.length, true);
            centralView.setUint32(24, dataBytes.length, true);
            centralView.setUint16(28, nameBytes.length, true);
            centralView.setUint32(42, offset, true);
            centralHeader.set(nameBytes, 46);

            localParts.push(localHeader, dataBytes);
            centralParts.push(centralHeader);
            offset += localHeader.length + dataBytes.length;
            processedEntries += 1;
            await onProgress((processedEntries / entries.length) * 100, 'ZIP 생성 중');
          }

          const centralDirectory = concatBytes(centralParts);
          const endRecord = createZipHeader(22, 0x06054b50);
          const endView = new DataView(endRecord.buffer);
          endView.setUint16(8, entries.length, true);
          endView.setUint16(10, entries.length, true);
          endView.setUint32(12, centralDirectory.length, true);
          endView.setUint32(16, offset, true);

          return new Blob([...localParts, centralDirectory, endRecord], { type: 'application/zip' });
        }

        function downloadBlob(blob, filename) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          link.remove();
          setTimeout(() => URL.revokeObjectURL(url), 1500);
        }

        function formatBytes(bytes) {
          if (bytes < 1024) return `${bytes}B`;
          if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
          return `${(bytes / 1024 / 1024).toFixed(1)}MB`;
        }

        function showDownloadFallbackLink(blob, filename) {
          clearPendingExportDownload();
          pendingExportDownloadUrl = URL.createObjectURL(blob);
          saveStatus.textContent = `ZIP 준비 완료 100% · ${formatBytes(blob.size)} · `;
          const link = document.createElement('a');
          link.className = 'export-ready-link';
          link.href = pendingExportDownloadUrl;
          link.download = filename;
          link.textContent = '다운로드';
          saveStatus.appendChild(link);
        }

        async function saveZipViaLocalServer(blob, filename) {
          try {
            const response = await fetch(LOCAL_EXPORT_ENDPOINT, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/zip',
                'X-Export-Filename': encodeURIComponent(filename)
              },
              body: blob
            });
            if (!response.ok) throw new Error(`Local export server returned ${response.status}`);
            return await response.json();
          } catch (error) {
            console.warn('Local export server unavailable', error);
            return null;
          }
        }

        async function createAssetExportEntries() {
          const assets = [
            { path: 'assets/css/main.css', type: 'text/css;charset=utf-8', label: 'CSS' },
            { path: 'assets/js/app.js', type: 'text/javascript;charset=utf-8', label: 'JS' }
          ];
          const entries = [];

          for (const asset of assets) {
            const result = await readExportAsset(asset.path, asset.label);
            if (!result.text) continue;
            entries.push({
              path: asset.path,
              blob: new Blob([result.text], { type: asset.type })
            });
          }

          return entries;
        }

        async function inspectZipBlob(blob) {
          if (!blob.size) throw new Error('ZIP 파일 생성 결과가 0KB입니다.');

          const bytes = new Uint8Array(await blob.arrayBuffer());
          let endOffset = -1;
          for (let index = bytes.length - 22; index >= 0; index -= 1) {
            if (
              bytes[index] === 0x50 &&
              bytes[index + 1] === 0x4b &&
              bytes[index + 2] === 0x05 &&
              bytes[index + 3] === 0x06
            ) {
              endOffset = index;
              break;
            }
          }
          if (endOffset < 0) throw new Error('ZIP 중앙 디렉터리를 찾을 수 없습니다.');

          const view = new DataView(bytes.buffer);
          const entryCount = view.getUint16(endOffset + 10, true);
          const centralSize = view.getUint32(endOffset + 12, true);
          const centralOffset = view.getUint32(endOffset + 16, true);
          if (!entryCount || !centralSize || centralOffset + centralSize > bytes.length) {
            throw new Error('ZIP 내부 목록 정보가 올바르지 않습니다.');
          }

          const decoder = new TextDecoder();
          const names = [];
          let cursor = centralOffset;
          for (let index = 0; index < entryCount; index += 1) {
            if (view.getUint32(cursor, true) !== 0x02014b50) {
              throw new Error('ZIP 파일 항목 정보가 손상되었습니다.');
            }
            const nameLength = view.getUint16(cursor + 28, true);
            const extraLength = view.getUint16(cursor + 30, true);
            const commentLength = view.getUint16(cursor + 32, true);
            const nameStart = cursor + 46;
            names.push(decoder.decode(bytes.slice(nameStart, nameStart + nameLength)));
            cursor = nameStart + nameLength + extraLength + commentLength;
          }

          return names;
        }

        async function exportToZip() {
          saveEditableContent();
          const exportFolderName = createExportFolderName();
          const zipFileName = `${exportFolderName}.zip`;

          setExportProgress(0, 'ZIP 내보내기 준비 중');
          const referenceStore = getReferenceStore();
          const { exportStore, imageList, imageFiles } = await createReferenceExportBundle(
            referenceStore,
            (percent, label) => updateExportProgress(5 + percent * 0.4, label)
          );
          await updateExportProgress(50, 'HTML 정리 중');
          const htmlContent = await getCleanExportHtml(exportStore, {
            inlineAssets: true,
            exportMode: 'folder'
          });
          const entries = [
            { path: `${exportFolderName}/index.html`, blob: new Blob([htmlContent], { type: 'text/html;charset=utf-8' }) },
            { path: `${exportFolderName}/data/reference-images.json`, blob: new Blob([JSON.stringify(exportStore, null, 2)], { type: 'application/json;charset=utf-8' }) },
            { path: `${exportFolderName}/data/image-manifest.json`, blob: new Blob([JSON.stringify(imageList, null, 2)], { type: 'application/json;charset=utf-8' }) },
            ...(await createAssetExportEntries()).map((entry) => ({ ...entry, path: `${exportFolderName}/${entry.path}` })),
            ...imageFiles.map((file) => ({ path: `${exportFolderName}/${file.path}`, blob: file.blob }))
          ];

          const zipBlob = await createZipBlob(
            entries,
            (percent, label) => updateExportProgress(55 + percent * 0.35, label)
          );
          const zipEntries = await inspectZipBlob(zipBlob);
          const requiredEntries = [
            `${exportFolderName}/index.html`,
            `${exportFolderName}/assets/css/main.css`,
            `${exportFolderName}/assets/js/app.js`,
            `${exportFolderName}/data/reference-images.json`,
            `${exportFolderName}/data/image-manifest.json`
          ];
          const missingEntries = requiredEntries.filter((entry) => !zipEntries.includes(entry));
          if (missingEntries.length) {
            throw new Error(`ZIP 필수 파일 누락: ${missingEntries.join(', ')}`);
          }

          await updateExportProgress(92, '로컬 저장 시도 중');
          const localExport = await saveZipViaLocalServer(zipBlob, zipFileName);
          if (localExport?.ok) {
            await updateExportProgress(100, `내보내기 완료: ${localExport.relativePath || zipFileName}`);
          } else {
            await updateExportProgress(94, '다운로드 준비 중');
            downloadBlob(zipBlob, zipFileName);
            showDownloadFallbackLink(zipBlob, zipFileName);
          }

          localStorage.setItem(LAST_EXPORT_STORAGE_KEY, htmlContent);
          localStorage.setItem('character-codex-last-export-filename-v1', `${exportFolderName}/index.html`);
        }

        async function exportCodex() {
          await exportToZip();
        }

        if (exportBtn) {
          exportBtn.addEventListener('click', async () => {
            exportBtn.disabled = true;
            try {
              await exportCodex();
            } catch (error) {
              if (error?.name === 'AbortError') {
                saveStatus.textContent = '내보내기 취소';
              } else {
                console.error('Folder export failed', error);
                saveStatus.textContent = '내보내기 실패';
                alert(error?.message || '내보내기 중 오류가 발생했습니다.');
              }
            } finally {
              exportBtn.disabled = false;
            }
          });
        }
      }

      // ===== VERSION HISTORY DISABLED =====
      function pushVersion() {
        return;
      }

      function restoreVersion() {
        return;
      }

      function initHistoryUI() {
        return;
      }

      function renderHistory() {
        return;
      }

      function initCollapsibleWindows() {
        return;
      }

      function runSelfChecks() {
        const checks = [
          ['탭 버튼 수', document.querySelectorAll('.tab-btn[data-screen-target]').length === 4],
          ['워크스페이스 탭', document.querySelectorAll('.workspace-tab[data-workspace-target]').length >= 2],
          ['워크스페이스 추가 버튼', !!byId('add-workspace-btn')],
          ['관계 루프', !!byId('relationship-loop')],
          ['관계 노드', document.querySelectorAll('.ring-node[data-rel]').length === 3],
          ['관계 패널', document.querySelectorAll('[data-rel-panel]').length === 3],
          ['저장 버튼', !!byId('save-btn')],
          ['도감 패널', document.querySelectorAll('.dossier-panel').length >= 3],
          ['도감 버튼', document.querySelectorAll('.nav-btn[data-dossier-target]').length >= 3],
          ['레퍼런스 카드', document.querySelectorAll('.reference-card[data-ref-group]').length >= 3],
          ['라이트박스', !!byId('reference-lightbox')]
        ];
        checks.forEach(([name, ok]) => {
          if (!ok) console.warn(`Self-check warning: ${name}`);
        });
      }

      function safeStep(name, fn) {
        try {
          if (typeof fn === 'function') fn();
        } catch (error) {
          console.error(`${name} 초기화 실패`, error);
        }
      }

      function init() {
        safeStep('workspace tabs', initWorkspaceTabs);
        safeStep('editable content load', loadEditableContent);
        safeStep('brief character content', applyBriefCharacterContent);
        safeStep('merge loop sections', mergeLoopSectionsIntoRelationships);
        safeStep('top tabs', initTabs);
        safeStep('relationship panel', initRelationshipPanel);
        safeStep('dossiers', initDossiers);
        safeStep('loop detail buttons', initLoopDetailButtons);
        safeStep('editable fields', initEditable);
        safeStep('reference cards', initReferenceCards);
        safeStep('disabled collapse compatibility', initCollapsibleWindows);
        safeStep('lightbox', initLightbox);
        safeStep('save system', initSave);
        safeStep('self checks', runSelfChecks);
      }

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
      } else {
        init();
      }
    })();
