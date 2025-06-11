# React 투두리스트 클론 프로젝트 보고서 (현재까지)

## 1. 프로젝트 개요

본 프로젝트는 React 라이브러리를 사용하여 Todoist와 유사한 웹 기반 투두리스트 애플리케이션을 구축하는 것을 목표로 합니다. 사용자가 작업을 추가하고, 각 작업의 상태(칼럼)에 따라 분류하여 시각적으로 관리할 수 있도록 기본적인 구조와 핵심 기능을 구현합니다.

## 2. 현재까지의 주요 구현 내용

### 2.1. 개발 환경 설정 및 초기화

* **도구:** Node.js, npm, create-react-app, VS Code
* **초기 설정:** `create-react-app`으로 React 프로젝트를 생성하고, 불필요한 기본 파일들을 정리하여 깨끗한 개발 환경을 구축했습니다.

### 2.2. 컴포넌트 구조화 및 계층 설계

애플리케이션의 UI를 모듈화하고 재사용성을 높이기 위해 다음과 같이 컴포넌트를 분리했습니다.

* **`App.js`**: 애플리케이션의 최상위 루트 컴포넌트.
* **`Sidebar.js`**: 좌측 메뉴 영역을 담당.
* **`MainContent.js`**: 우측의 메인 작업 목록 영역을 담당.
* **`TaskColumn.js`**: 'Get Started', 'Requests Backlog' 등 각 작업 상태(칼럼)를 표시하는 독립적인 컴포넌트 (총 4개 사용).
* **`AddTaskForm.js`**: 새로운 작업을 입력받는 폼 컴포넌트.

**컴포넌트 계층 구조:**

App
├── Sidebar
└── MainContent
└── TaskColumn (x4)
└── AddTaskForm (x1 for each TaskColumn)


### 2.3. 데이터 관리 및 흐름 (State & Props)

* **상태(State) 정의:** `App.js`에서 `useState` 훅을 사용하여 앱의 핵심 데이터인 `tasks` (작업 객체 배열)를 관리합니다. 각 작업은 `id`, `title`, `status` 등의 속성을 가집니다.
* **`props`를 통한 단방향 데이터 흐름:**
    * `App.js`에서 `tasks` 데이터를 `MainContent.js`로 전달합니다.
    * `MainContent.js`는 `tasks`를 `status` 값에 따라 `filter()` 메서드로 필터링하여 각 `TaskColumn.js`에 `props`로 전달합니다.
    * `TaskColumn.js`는 전달받은 `tasks` 배열을 `map()` 메서드로 렌더링하며, 이때 각 아이템에 `key={task.id}`를 부여하여 효율적인 목록 관리를 합니다.
* **함수 `props` 전달 (상태 끌어올리기):**
    * `App.js`에 `addTask` 함수를 정의하여 새로운 작업의 `id` 생성 및 `tasks` 상태 업데이트 로직을 구현했습니다 (`setTasks(prevTasks => [...prevTasks, newTask])`와 같은 불변성 패턴 사용).
    * `addTask` 함수를 `onAddTask`라는 `props` 이름으로 `App.js` → `MainContent.js` → `TaskColumn.js` → `AddTaskForm.js` 순서로 전달했습니다 (Props Drilling).

### 2.4. 사용자 인터랙션 및 기능 구현

* **새로운 작업 추가 기능:**
    * `AddTaskForm.js`에서 `useState`와 `onChange` 이벤트 핸들러를 사용하여 `input` 필드의 값을 `newTaskTitle` 상태로 실시간 관리합니다 (제어 컴포넌트 패턴).
    * `input` 필드에서 사용자가 `Enter` 키를 눌렀을 때, `e.preventDefault()`로 기본 동작을 막고, 전달받은 `onAddTask` 함수를 호출하여 새로운 작업을 `tasks` 목록에 추가합니다. (인자로 `newTaskTitle.trim()`과 `columnId` 전달).
    * 작업 추가 후 `setNewTaskTitle('')`를 통해 입력 필드를 자동으로 초기화합니다.

### 2.5. UI/UX 디자인 (CSS)

* `App.css`, `Sidebar.css`, `MainContent.css`, `TaskColumn.css` 파일을 사용하여 원본 샘플 이미지와 유사한 시각적 디자인을 구현했습니다.
* **주요 스타일링 적용:**
    * 앱 전체의 배경색, 폰트 스타일 조정.
    * 사이드바와 메인 콘텐츠의 `flexbox`를 이용한 레이아웃.
    * 각 `TaskColumn` 및 내부 작업 아이템(`div`)의 배경색, 테두리, 그림자, 패딩, `border-radius` 등.
    * `TaskColumn.js`에서 `columnTitle`을 기반으로 동적인 클래스(`get-started`, `requests-backlog` 등)를 생성하고, `TaskColumn.css`에서 이 클래스들을 활용하여 각 칼럼 헤더의 **하단 선 색상을 다르게 표현**했습니다.
    * 각 작업 아이템(`div`)에 마우스 오버 시 `transform: translateY(-1px)`와 `box-shadow`를 활용한 **부드러운 호버 효과**를 적용했습니다.

## 3. 현재 앱의 상태 및 기능

* 웹 브라우저에서 실행 가능한 형태로, 좌측 사이드바와 우측 메인 작업 영역이 분리되어 표시됩니다.
* 메인 영역에는 'Get Started', 'Requests Backlog', 'In Progress', 'Approved' 네 개의 작업 칼럼이 가로로 정렬되어 있습니다.
* 각 칼럼에는 미리 정의된 작업들이 표시되며, 칼럼 제목 아래에 해당 상태별 색상 구분선과 작업 개수가 표시됩니다.
* 가장 중요한 기능으로, 각 칼럼 하단의 입력 필드에 새로운 작업 제목을 입력하고 Enter 키를 누르면, 해당 칼럼에 새로운 작업이 실시간으로 추가되고 입력 필드가 초기화됩니다.

## 4. 향후 계획 (추가 기능 및 개선 사항)

본 프로젝트는 현재 핵심 기능의 기반을 다졌으며, 향후 다음과 같은 기능들을 추가하여 완성도를 높일 수 있습니다.

* **작업 관리 기능 확장:** 작업 완료(체크박스), 작업 삭제, 작업 수정 기능 구현.
* **고급 상호작용:** 드래그 앤 드롭을 통한 작업 상태(칼럼) 변경 기능 구현 (높은 난이도).
* **필터링 및 정렬:** 사이드바 메뉴 및 메인 헤더의 아이콘을 통한 작업 필터링/정렬 기능.
* **UI/UX 디테일:** 각 작업 카드 내부에 날짜, 서브 작업, 태그 등 추가 정보 및 아이콘 표시.
* **전역 상태 관리:** 앱 규모 확장에 따라 Context API 또는 Redux와 같은 전역 상태 관리 라이브러리 도입 고려.
* **백엔드 연동:** 서버 API를 통해 실제 데이터 저장 및 불러오기 기능 구현.
* **반응형 디자인:** 다양한 화면 크기(모바일, 태블릿)에 대응하는 반응형 웹 구현.
* **배포:** Netlify, Vercel 등을 통한 실제 웹 배포 경험.

---