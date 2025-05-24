import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  setDoc,
  doc,
  getDocs,
  query,
  where,
  // orderBy // Removed because it requires a Firestore composite index
} from './firebase.js';

document.addEventListener('DOMContentLoaded', () => {
  // --------------- Logout button -----------------
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', async () => {
      try {
        await signOut(auth);
        alert('Logged out successfully.');
        window.location.href = "index.html";
      } catch (error) {
        alert('Logout failed: ' + error.message);
      }
    });
  }

  // --------------- Signup form -----------------
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('signup-email').value.trim();
      const password = document.getElementById('signup-password').value.trim();

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user info in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          skills: [],
          createdAt: new Date()
        });

        alert('Signup successful! Please login.');
        window.location.href = "login.html";
      } catch (error) {
        alert('Signup error: ' + error.message);
      }
    });
  }

  // --------------- Login form -----------------
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();

      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Login successful!');
        window.location.href = "tasks.html";
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    });
  }

  // ---------------- Tasks page ------------------
  const taskInput = document.getElementById('task-input');
  if (!taskInput) return; // not tasks page

  const dueDateInput = document.getElementById('due-date');
  const priorityLevelSelect = document.getElementById('priority-level');
  const addTaskButton = document.getElementById('add-task-button');
  const taskList = document.getElementById('task-list');
  const progressBar = document.getElementById('progress-bar').querySelector('.inner-bar');
  const progressNumbers = document.getElementById('progress-numbers');
  const searchInput = document.getElementById('search-input');

  // Add a task UI element
  function addTaskToUI(task) {
    const listItem = document.createElement('li');
    listItem.className = task.priority;

    listItem.innerHTML = `
      <input type="checkbox" />
      <span class="task-text">${task.title}</span>
      <span class="due-date">${task.dueDate}</span>
      <span class="priority">${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span>
      <div class="task-buttons">
        <button class="edit-btn" aria-label="Edit this task"><i class="fas fa-edit"></i> Edit</button>
        <button class="delete-btn" aria-label="Delete this task"><i class="fas fa-trash"></i> Delete</button>
      </div>
    `;

    taskList.appendChild(listItem);
  }

  // Load tasks from Firestore for current user
  async function loadTasks() {
    const user = auth.currentUser;
    if (!user) return;

    try {
      // Removed orderBy to avoid index creation error
      const tasksQuery = query(
        collection(db, 'tasks'),
        where('userId', '==', user.uid),
        // orderBy('createdAt', 'asc')  <-- removed because it requires an index
      );

      const querySnapshot = await getDocs(tasksQuery);
      taskList.innerHTML = ''; // clear existing tasks

      querySnapshot.forEach(doc => {
        const task = doc.data();
        addTaskToUI(task);
      });

      updateProgress();
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }

  // Add new task handler
  async function addTask() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priorityLevel = priorityLevelSelect.value;

    if (!taskText || !dueDate) {
      alert('Please enter a task and a due date!');
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to add a task.');
      return;
    }

    try {
      await addDoc(collection(db, 'tasks'), {
        userId: user.uid,
        title: taskText,
        description: '',
        dueDate,
        priority: priorityLevel,
        createdAt: new Date()
      });

      // Reload tasks to include new task from Firestore
      await loadTasks();

      taskInput.value = '';
      dueDateInput.value = '';
      priorityLevelSelect.value = 'low';
      updateProgress();
    } catch (error) {
      alert('Error adding task: ' + error.message);
    }
  }

  // Filter tasks UI
  function filterTasks() {
    const searchTerm = searchInput.value.toLowerCase();
    const tasks = taskList.getElementsByTagName('li');

    for (let task of tasks) {
      const text = task.querySelector('.task-text').innerText.toLowerCase();
      task.style.display = text.includes(searchTerm) || searchTerm === '' ? 'flex' : 'none';
    }
  }

  // Update progress bar and text
  function updateProgress() {
    const total = taskList.children.length;
    const completed = [...taskList.children].filter(el => el.querySelector('input[type="checkbox"]').checked).length;

    progressBar.style.width = total === 0 ? '0' : `${(completed / total) * 100}%`;
    progressNumbers.innerText = `${completed}/${total}`;
  }

  // Handle task list events (edit, delete, checkbox)
  taskList.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('delete-btn')) {
      target.closest('li').remove();
      updateProgress();
    } else if (target.classList.contains('edit-btn')) {
      const listItem = target.closest('li');
      taskInput.value = listItem.querySelector('.task-text').innerText;
      dueDateInput.value = listItem.querySelector('.due-date').innerText;
      priorityLevelSelect.value = listItem.className;
      listItem.remove();
      updateProgress();
    }
  });

  taskList.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
      updateProgress();
    }
  });

  addTaskButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  searchInput.addEventListener('input', filterTasks);

  // Listen for auth state changes:
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loadTasks();
    } else {
      taskList.innerHTML = '';
      updateProgress();
    }
  });
});
