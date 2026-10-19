/**
 * CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM 20/10
 * Script: Particle Systems, Parametric Heart, Card Generator, Audio Synthesizer
 */

(function () {
  'use strict';

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  let currentRecipient = 'Người Phụ Nữ Tuyệt Vời';
  let flowerCount = 520;
  let isMusicPlaying = false;
  let audioContext = null;
  let musicTimeout = null;

  // ==========================================
  // WISHES DATA DIRECTORY
  // ==========================================
  const wishesDatabase = {
    me: [
      {
        title: "Mẹ Yêu Kính Yêu",
        text: "Mẹ ơi, con chúc Mẹ 20/10 ngập tràn nụ cười, dồi dào sức khỏe và luôn an yên bên gia đình. Cảm ơn Mẹ đã luôn hy sinh và dành trọn tình thương bao la cho chúng con!",
        icon: "🌸"
      },
      {
        title: "Tri Ân Mẹ Hiền",
        text: "Chúc người phụ nữ vĩ đại nhất trong cuộc đời con ngày 20/10 thật hạnh phúc. Mẹ mãi là ngọn hải đăng soi sáng và là điểm tựa ấm áp nhất của con!",
        icon: "💖"
      },
      {
        title: "Tình Mẹ Bao La",
        text: "Con mong thời gian trôi thật chậm để tóc Mẹ đừng thêm sợi bạc, nụ cười Mẹ luôn rạng rỡ và niềm vui luôn ngập tràn mỗi sớm mai thức giấc!",
        icon: "🌷"
      }
    ],
    vo: [
      {
        title: "Gửi Vợ Yêu Dấu",
        text: "Chúc em ngày 20/10 thật nhiều niềm vui! Cảm ơn em đã là hậu phương vững chắc, là mái ấm dịu dàng và là món quà tuyệt vời nhất mà cuộc đời đã ban tặng cho anh.",
        icon: "🌹"
      },
      {
        title: "Em Là Điều Duy Nhất",
        text: "20/10 chúc người yêu của anh luôn xinh đẹp rạng rỡ, bớt lo toan và luôn nở nụ cười trên môi. Có em ở bên là niềm hạnh phúc lớn nhất của anh mỗi ngày!",
        icon: "💕"
      },
      {
        title: "Yêu Chiều Mỗi Ngày",
        text: "Không chỉ hôm nay 20/10, mà 365 ngày trong năm anh đều mong em luôn được nâng niu, yêu chiều và đón nhận những điều ngọt ngào nhất!",
        icon: "💐"
      }
    ],
    crush: [
      {
        title: "Đóa Hoa Rực Rỡ",
        text: "Chúc bạn có một ngày 20/10 nhận được cả một bầu trời hoa, quà và muôn ngàn lời chúc dễ thương nhất! Luôn yêu đời và tươi tắn như hoa mùa thu nhé!",
        icon: "✨"
      },
      {
        title: "Gửi Crush Đáng Yêu",
        text: "20/10 chúc cô gái đặc biệt luôn ngọt ngào, may mắn trong học tập và công việc. Mong nụ cười tỏa nắng của cậu sẽ luôn bừng sáng mỗi ngày!",
        icon: "🎀"
      },
      {
        title: "Vạn Dặm Bình An",
        text: "Chúc bạn luôn giữ được sự lạc quan, tự tin và duyên dáng. Hôm nay là ngày của bạn, hãy tận hưởng trọn vẹn những điều tuyệt vời nhất nhé!",
        icon: "🌼"
      }
    ],
    chi: [
      {
        title: "Chị Gái Đảm Đang",
        text: "Chúc Chị gái 20/10 thật rực rỡ, ngày càng trẻ trung, xinh đẹp, công việc thăng tiến vù vù và luôn ngập tràn niềm vui cùng hạnh phúc!",
        icon: "🌺"
      },
      {
        title: "Em Gái Nhỏ Bé",
        text: "Chúc bé út 20/10 luôn hồn nhiên, học giỏi, xinh xắn và nhận được thật nhiều quà to bự. Mãi là cô em gái đáng yêu của cả nhà!",
        icon: "🍭"
      },
      {
        title: "Gia Đình Gắn Kết",
        text: "Chúc chị em chúng mình luôn yêu thương, đồng hành và cùng nhau chia sẻ mọi khoảnh khắc đáng nhớ. Chúc chị/em ngày 20/10 thật hạnh phúc!",
        icon: "🌾"
      }
    ],
    co: [
      {
        title: "Tri Ân Cô Giáo",
        text: "Kính chúc Cô 20/10 luôn dồi dào sức khỏe, tràn đầy nhiệt huyết để tiếp tục dìu dắt các thế hệ học trò trên con đường tri thức. Chúng em biết ơn Cô rất nhiều!",
        icon: "📚"
      },
      {
        title: "Người Đưa Đò Tận Tâm",
        text: "Nhân Ngày 20/10, em xin gửi lời cảm ơn sâu sắc nhất tới Cô. Chúc Cô luôn tươi trẻ, bình an và gặt hái thêm nhiều thành công trong sự nghiệp trồng người!",
        icon: "🌿"
      },
      {
        title: "Bông Hoa Tri Thức",
        text: "Chúc Cô một ngày 20/10 ấm áp ngập tràn hoa tươi, niềm vui và tình cảm kính yêu từ tất cả các thế hệ học trò!",
        icon: "🌸"
      }
    ],
    dongnghiep: [
      {
        title: "Đồng Nghiệp Duyên Dáng",
        text: "Chúc các chị em đồng nghiệp 20/10 vui tươi, nhận được nhiều hoa và quà, KPI hoàn thành xuất sắc và công việc luôn thuận buồm xuôi gió!",
        icon: "💼"
      },
      {
        title: "Bóng Hồng Công Sở",
        text: "Cảm ơn các bóng hồng đã luôn mang lại không khí vui vẻ, tươi sáng cho văn phòng. Chúc bạn 20/10 luôn rạng ngời và ngập tràn hạnh phúc!",
        icon: "⭐"
      },
      {
        title: "Thành Công & Hạnh Phúc",
        text: "Chúc bạn luôn giữ vững phong độ, xinh đẹp, độc lập và luôn tỏa sáng với đam mê của mình. Happy Vietnamese Women's Day 20/10!",
        icon: "🥂"
      }
    ]
  };

  // Fortune & Compliment List
  const fortuneQuotes = [
    "✨ Nụ cười của bạn là ánh nắng ấm áp và rực rỡ nhất ngày hôm nay!",
    "💖 Bạn là đóa hoa xinh đẹp, độc nhất vô nhị và tuyệt vời trên thế giới này!",
    "🌷 Chúc bạn mãi giữ trọn nét duyên dáng, thông minh và tinh tế trong từng khoảnh khắc!",
    "🌟 Bạn sinh ra là để được nâng niu, trân trọng và đón nhận yêu thương trọn vẹn!",
    "🌸 Năng lượng tích cực từ bạn luôn mang lại niềm tin và nụ cười cho mọi người!",
    "🎀 Hãy luôn tự tin vào bản thân, vì phiên bản rạng rỡ nhất của bạn chính là tuyệt nhất!",
    "💐 Mong rằng mọi điều may mắn, bình an và hạnh phúc nhất sẽ đến với bạn hôm nay!",
    "✨ Chúc bạn một đời an yên, tự do bay nhảy và từng bước chạm tới mọi ước mơ!",
    "💕 Cảm ơn bạn vì đã luôn hiện diện và làm cho cuộc đời này trở nên dịu dàng hơn!",
    "🌹 Hôm nay bạn xứng đáng nhận được 1.000 điểm đáng yêu và xinh đẹp ngút ngàn!"
  ];

  // ==========================================
  // INITIALIZATION ON DOM READY
  // ==========================================
  function initApplication() {
    loadAdminPersistedSettings();
    setupRecipientSync();
    setupBackgroundParticles();
    setupParametricHeartCanvas();
    setup3DGiftBox();
    setupWishesTabs();
    setupCardCreator();
    setupInteractiveGarden();
    setupFortuneWheel();
    setupAudioSynthesizer();
    setupGlobalClickHearts();
    setupUserAuthSystem();
    setupAdminSystem();
  }

  // ==========================================
  // USER LOGIN MODAL
  // ==========================================
  function setupUserAuthSystem() {
    const config = window.SUPABASE_CONFIG;
    const supabaseLibrary = window.supabase;
    const authButton = document.getElementById('btn-user-auth');
    const authModal = document.getElementById('auth-modal');
    const profileModal = document.getElementById('user-profile-modal');
    const loginTab = document.getElementById('auth-tab-login-btn');
    const registerTab = document.getElementById('auth-tab-register-btn');
    const loginForm = document.getElementById('form-login');
    const registerForm = document.getElementById('form-register');
    const authStatus = document.getElementById('auth-status');
    const closeButton = document.getElementById('btn-close-auth-modal');
    const cancelRegisterButton = document.getElementById('btn-cancel-register');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    const registerName = document.getElementById('reg-fullname');
    const registerEmail = document.getElementById('reg-email');
    const registerPassword = document.getElementById('reg-password');
    const registerRecipient = document.getElementById('reg-recipient');
    const profileCloseButton = document.getElementById('btn-close-profile-modal');
    const profileLogoutButton = document.getElementById('btn-user-logout');
    const profileRecipientButton = document.getElementById('btn-profile-change-recipient');
    const accountSettingsButton = document.getElementById('btn-toggle-account-settings');
    const accountSettings = document.getElementById('account-settings');
    const displayNameForm = document.getElementById('form-update-display-name');
    const displayNameInput = document.getElementById('account-display-name-input');
    const emailForm = document.getElementById('form-update-email');
    const emailInput = document.getElementById('account-email-input');
    const passwordForm = document.getElementById('form-update-password');
    const newPasswordInput = document.getElementById('account-password-input');
    let supabaseClient = null;
    let activeAccount = null;
    let profileSaveTimer = null;
    let loadedUserId = null;

    function showAuthStatus(message, type = 'error') {
      if (!authStatus) {
        showToast(message);
        return;
      }
      authStatus.textContent = message;
      authStatus.className = `auth-status ${type}`;
      authStatus.hidden = false;
    }

    function clearAuthStatus() {
      if (!authStatus) return;
      authStatus.textContent = '';
      authStatus.className = 'auth-status';
      authStatus.hidden = true;
    }

    function getAuthErrorMessage(error, action) {
      const message = String(error?.message || '');
      const normalized = message.toLowerCase();
      if (/invalid login credentials|invalid credentials/.test(normalized)) {
        return 'Email hoặc mật khẩu không chính xác.';
      }
      if (/email not confirmed/.test(normalized)) {
        return 'Email chưa được xác nhận. Hãy mở thư xác nhận từ Supabase rồi thử đăng nhập lại.';
      }
      if (/already registered|already been registered|user already exists/.test(normalized)) {
        return 'Email này đã có tài khoản. Hãy đăng nhập hoặc dùng chức năng khôi phục mật khẩu trong Supabase.';
      }
      if (/password should be at least|password.*too short|weak password/.test(normalized)) {
        return 'Mật khẩu chưa đạt yêu cầu tối thiểu của Supabase. Hãy nhập mật khẩu mạnh hơn.';
      }
      if (/rate limit|too many requests/.test(normalized)) {
        return 'Bạn thao tác quá nhiều lần. Hãy đợi một lúc rồi thử lại.';
      }
      if (/failed to fetch|network|load failed/.test(normalized)) {
        return 'Không kết nối được Supabase. Kiểm tra mạng, Project URL và cấu hình Supabase.';
      }
      return `Không thể ${action}: ${message || 'Lỗi không xác định từ Supabase.'}`;
    }

    if (
      supabaseLibrary &&
      typeof supabaseLibrary.createClient === 'function' &&
      config &&
      config.url &&
      config.anonKey
    ) {
      try {
        const projectUrl = new URL(config.url);
        if (
          (projectUrl.protocol !== 'https:' && projectUrl.hostname !== 'localhost') ||
          !config.anonKey.trim()
        ) {
          throw new Error('URL hoặc anon/public key không hợp lệ.');
        }
        supabaseClient = supabaseLibrary.createClient(config.url, config.anonKey);
      } catch (error) {
        console.error('Supabase configuration error:', error);
        showAuthStatus('Cấu hình Supabase không hợp lệ. Kiểm tra Project URL và anon/public key trong supabase-config.js.');
      }
    } else if (!supabaseLibrary || typeof supabaseLibrary.createClient !== 'function') {
      showAuthStatus('Không tải được thư viện Supabase. Kiểm tra kết nối Internet rồi tải lại trang.');
    } else {
      showAuthStatus('Chưa thể đăng ký hoặc đăng nhập: hãy điền Project URL và anon/public key của Supabase vào supabase-config.js.');
    }

    function updateProfile() {
      const account = activeAccount;
      const buttonText = document.getElementById('btn-user-text');
      const buttonIcon = authButton ? authButton.querySelector('.btn-icon') : null;
      const statusCard = document.getElementById('user-status-card');
      const loggedName = document.getElementById('logged-user-name');
      const profileName = document.getElementById('profile-display-name');
      const profileUsername = document.getElementById('profile-username-text');
      const profileRecipient = document.getElementById('profile-recipient-text');
      const adminAccessBox = document.getElementById('admin-access-box');
      const profileRole = document.getElementById('profile-role-badge');
      const isAdmin = Boolean(account && account.role === 'admin');

      if (buttonText) buttonText.textContent = account ? account.displayName : 'Đăng nhập';
      if (buttonIcon) buttonIcon.textContent = account ? '🌸' : '👤';
      if (statusCard) statusCard.style.display = account ? 'flex' : 'none';
      if (loggedName) loggedName.textContent = account ? account.displayName : '';
      if (profileName) profileName.textContent = account ? account.displayName : '';
      if (profileUsername) profileUsername.textContent = account ? account.email : '';
      if (profileRecipient) profileRecipient.textContent = account ? account.recipient : '';
      if (profileRole) profileRole.textContent = isAdmin ? 'Quản trị viên' : 'Thành viên cá nhân';
      if (adminAccessBox) adminAccessBox.style.display = isAdmin ? 'block' : 'none';
      document.dispatchEvent(new CustomEvent('account:role-changed', {
        detail: { isAdmin, isLoggedIn: Boolean(account) }
      }));
    }

    function dispatchRecipientUpdate(name) {
      document.dispatchEvent(new CustomEvent('account:set-recipient', { detail: name }));
    }

    function getCardData() {
      return {
        from: document.getElementById('card-input-from')?.value || '',
        theme: document.getElementById('card-theme-select')?.value || 'rose',
        message: document.getElementById('card-input-message')?.value || ''
      };
    }

    const defaultCard = getCardData();

    function applyCard(card) {
      const values = { ...defaultCard, ...(card || {}) };
      const sender = document.getElementById('card-input-from');
      const theme = document.getElementById('card-theme-select');
      const message = document.getElementById('card-input-message');
      if (sender) sender.value = values.from;
      if (theme) theme.value = values.theme;
      if (message) message.value = values.message;
      renderGreetingCard();
    }

    async function persistProfile() {
      if (!activeAccount) return;
      if (!supabaseClient) throw new Error('Chưa cấu hình kết nối Supabase.');
      const account = activeAccount;
      account.recipient = currentRecipient;
      account.card = getCardData();
      const { error } = await supabaseClient
        .from('user_profiles')
        .upsert({
          id: account.id,
          display_name: account.displayName,
          recipient: account.recipient,
          card: account.card,
          updated_at: new Date().toISOString()
        }, { onConflict: 'id' });
      if (error) throw error;
      if (activeAccount === account) updateProfile();
    }

    function saveActiveAccount() {
      if (!activeAccount || !supabaseClient) return;
      clearTimeout(profileSaveTimer);
      profileSaveTimer = setTimeout(() => {
        persistProfile().catch(error => {
          console.error('Could not save account profile:', error);
          showToast(`⚠️ Không thể lưu dữ liệu lên máy chủ: ${error.message}`);
        });
      }, 600);
    }

    async function activateUser(user) {
      if (!user || loadedUserId === user.id) return;
      loadedUserId = user.id;
      activeAccount = {
        id: user.id,
        email: user.email || '',
        displayName: user.user_metadata?.display_name || user.email || 'Thành viên',
        recipient: user.user_metadata?.recipient || 'Người Phụ Nữ Tuyệt Vời',
        role: user.app_metadata?.role || '',
        card: null
      };
      updateProfile();

      try {
        const { data, error } = await supabaseClient
          .from('user_profiles')
          .select('display_name, recipient, card')
          .eq('id', user.id)
          .maybeSingle();
        if (error) throw error;
        if (loadedUserId !== user.id || activeAccount?.id !== user.id) return;
        if (data) {
          activeAccount.displayName = data.display_name || activeAccount.displayName;
          activeAccount.recipient = data.recipient || activeAccount.recipient;
          activeAccount.card = data.card || null;
        }

        if (activeAccount.card) {
          applyCard(activeAccount.card);
        } else {
          applyCard(defaultCard);
          currentRecipient = activeAccount.recipient;
          await persistProfile();
        }
        if (loadedUserId !== user.id || activeAccount?.id !== user.id) return;
        dispatchRecipientUpdate(activeAccount.recipient);
        updateProfile();
      } catch (error) {
        if (loadedUserId === user.id) {
          loadedUserId = null;
          activeAccount = null;
          updateProfile();
        }
        throw error;
      }
    }

    function showProfile() {
      updateProfile();
      if (displayNameInput && activeAccount) displayNameInput.value = activeAccount.displayName;
      if (emailInput && activeAccount) emailInput.value = activeAccount.email;
      if (profileModal) profileModal.classList.add('open');
    }

    function showAuthTab(tab) {
      const isLogin = tab === 'login';
      clearAuthStatus();
      if (loginTab) loginTab.classList.toggle('active', isLogin);
      if (registerTab) registerTab.classList.toggle('active', !isLogin);
      if (loginForm) loginForm.classList.toggle('active', isLogin);
      if (registerForm) registerForm.classList.toggle('active', !isLogin);
    }

    function closeAuthModal() {
      if (authModal) authModal.classList.remove('open');
    }

    if (authButton && authModal) {
      authButton.addEventListener('click', () => {
        if (activeAccount) {
          showProfile();
        } else {
          showAuthTab('login');
          authModal.classList.add('open');
          if (loginEmail) setTimeout(() => loginEmail.focus(), 150);
        }
      });
    }

    if (loginTab) loginTab.addEventListener('click', () => showAuthTab('login'));
    if (registerTab) registerTab.addEventListener('click', () => showAuthTab('register'));

    const registerLink = document.getElementById('link-go-to-register');
    const loginLink = document.getElementById('link-go-to-login');
    if (registerLink) registerLink.addEventListener('click', () => showAuthTab('register'));
    if (loginLink) loginLink.addEventListener('click', () => showAuthTab('login'));

    if (closeButton) closeButton.addEventListener('click', closeAuthModal);
    if (cancelRegisterButton) cancelRegisterButton.addEventListener('click', closeAuthModal);
    if (profileCloseButton && profileModal) {
      profileCloseButton.addEventListener('click', () => profileModal.classList.remove('open'));
    }
    if (profileModal) {
      profileModal.addEventListener('click', event => {
        if (event.target === profileModal) profileModal.classList.remove('open');
      });
    }
    if (profileRecipientButton) {
      profileRecipientButton.addEventListener('click', () => {
        if (profileModal) profileModal.classList.remove('open');
        document.getElementById('btn-open-recipient-modal')?.click();
      });
    }
    if (accountSettingsButton && accountSettings) {
      accountSettingsButton.addEventListener('click', () => {
        accountSettings.hidden = !accountSettings.hidden;
        accountSettingsButton.setAttribute('aria-expanded', String(!accountSettings.hidden));
        if (!accountSettings.hidden && activeAccount) {
          if (displayNameInput) displayNameInput.value = activeAccount.displayName;
          if (emailInput) emailInput.value = activeAccount.email;
        }
      });
    }

    if (displayNameForm) {
      displayNameForm.addEventListener('submit', async event => {
        event.preventDefault();
        if (!activeAccount || !supabaseClient || !displayNameInput) return;
        const displayName = displayNameInput.value.trim();
        if (!displayName) {
          showToast('⚠️ Vui lòng nhập tên hiển thị.');
          return;
        }

        try {
          const { error } = await supabaseClient.auth.updateUser({
            data: { display_name: displayName }
          });
          if (error) throw error;
          activeAccount.displayName = displayName;
          await persistProfile();
          showToast('✅ Đã lưu tên hiển thị lên máy chủ.');
        } catch (error) {
          console.error('Could not update display name:', error);
          showToast(`⚠️ Không thể cập nhật tên: ${error.message}`);
        }
      });
    }

    if (emailForm) {
      emailForm.addEventListener('submit', async event => {
        event.preventDefault();
        if (!activeAccount || !supabaseClient || !emailInput) return;
        const email = emailInput.value.trim();
        if (!email || email === activeAccount.email) {
          showToast('ℹ️ Hãy nhập một email mới khác email hiện tại.');
          return;
        }

        try {
          const { data, error } = await supabaseClient.auth.updateUser({ email });
          if (error) throw error;
          if (data.user && data.user.email) activeAccount.email = data.user.email;
          updateProfile();
          showToast('📧 Đã yêu cầu đổi email. Hãy kiểm tra hộp thư và xác nhận nếu Supabase yêu cầu.');
        } catch (error) {
          console.error('Could not update email:', error);
          showToast(`⚠️ Không thể đổi email: ${error.message}`);
        }
      });
    }

    if (passwordForm) {
      passwordForm.addEventListener('submit', async event => {
        event.preventDefault();
        if (!activeAccount || !supabaseClient || !newPasswordInput) return;
        if (newPasswordInput.value.length < 8) {
          showToast('⚠️ Mật khẩu mới cần có ít nhất 8 ký tự.');
          return;
        }

        try {
          const { error } = await supabaseClient.auth.updateUser({
            password: newPasswordInput.value
          });
          if (error) throw error;
          passwordForm.reset();
          showToast('✅ Đã đổi mật khẩu tài khoản.');
        } catch (error) {
          console.error('Could not update password:', error);
          showToast(`⚠️ Không thể đổi mật khẩu: ${error.message}`);
        }
      });
    }

    if (loginForm) {
      loginForm.addEventListener('submit', async event => {
        event.preventDefault();
        if (!supabaseClient) {
          showAuthStatus('Chưa thể đăng nhập vì Supabase chưa được cấu hình. Điền Project URL và anon/public key vào supabase-config.js.');
          return;
        }
        const email = loginEmail ? loginEmail.value.trim().toLowerCase() : '';
        const password = loginPassword ? loginPassword.value : '';
        const submitButton = document.getElementById('btn-submit-login');
        if (submitButton) submitButton.disabled = true;
        clearAuthStatus();
        try {
          const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
          if (error) throw error;
          closeAuthModal();
          loginForm.reset();
          showToast('🎉 Đăng nhập thành công!');
        } catch (error) {
          console.error('Supabase sign-in failed:', error);
          showAuthStatus(getAuthErrorMessage(error, 'đăng nhập'));
        } finally {
          if (submitButton) submitButton.disabled = false;
        }
      });
    }

    if (registerForm) {
      registerForm.addEventListener('submit', async event => {
        event.preventDefault();
        if (!supabaseClient) {
          showAuthStatus('Chưa thể tạo tài khoản vì Supabase chưa được cấu hình. Điền Project URL và anon/public key vào supabase-config.js.');
          return;
        }
        const displayName = registerName ? registerName.value.trim() : '';
        const email = registerEmail ? registerEmail.value.trim().toLowerCase() : '';
        const password = registerPassword ? registerPassword.value : '';
        const recipient = (registerRecipient && registerRecipient.value.trim()) ||
          currentRecipient || 'Người Phụ Nữ Tuyệt Vời';

        if (password.length < 8) {
          showAuthStatus('Mật khẩu cần có ít nhất 8 ký tự.');
          return;
        }

        const submitButton = document.getElementById('btn-submit-register');
        if (submitButton) submitButton.disabled = true;
        clearAuthStatus();
        try {
          const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
              data: { display_name: displayName, recipient },
              emailRedirectTo: window.location.href.split('#')[0]
            }
          });
          if (error) throw error;
          if (!data.user) {
            throw new Error('Supabase không trả về tài khoản sau khi đăng ký.');
          }
          if (Array.isArray(data.user.identities) && data.user.identities.length === 0) {
            showAuthStatus('Email này đã có tài khoản. Hãy chuyển sang tab Đăng Nhập.');
            return;
          }
          registerForm.reset();
          if (data.session) {
            closeAuthModal();
            showToast(`✅ Tạo tài khoản thành công. Xin chào ${displayName}!`);
          } else {
            if (loginEmail) loginEmail.value = email;
            showAuthTab('login');
            showAuthStatus('Đã tạo tài khoản. Hãy mở email xác nhận của Supabase rồi quay lại đăng nhập.', 'success');
          }
        } catch (error) {
          console.error('Supabase sign-up failed:', error);
          showAuthStatus(getAuthErrorMessage(error, 'tạo tài khoản'));
        } finally {
          if (submitButton) submitButton.disabled = false;
        }
      });
    }

    if (profileLogoutButton) {
      profileLogoutButton.addEventListener('click', async () => {
        if (!supabaseClient) return;
        try {
          const { error } = await supabaseClient.auth.signOut();
          if (error) throw error;
          activeAccount = null;
          loadedUserId = null;
          applyCard(defaultCard);
          dispatchRecipientUpdate(localStorage.getItem('default_recipient') || 'Người Phụ Nữ Tuyệt Vời');
          updateProfile();
          if (profileModal) profileModal.classList.remove('open');
          showToast('🚪 Bạn đã đăng xuất.');
        } catch (error) {
          showToast(`⚠️ Không thể đăng xuất: ${error.message}`);
        }
      });
    }

    document.addEventListener('account:set-recipient', event => {
      const name = event.detail;
      if (typeof name === 'string' && name.trim()) {
        const recipientInput = document.getElementById('reg-recipient');
        if (recipientInput) recipientInput.value = name.trim();
      }
    });
    document.addEventListener('account:recipient-changed', () => {
      saveActiveAccount();
    });

    ['card-input-from', 'card-theme-select', 'card-input-message'].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', saveActiveAccount);
        input.addEventListener('change', saveActiveAccount);
      }
    });

    if (supabaseClient) {
      supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          clearTimeout(profileSaveTimer);
          activeAccount = null;
          loadedUserId = null;
          applyCard(defaultCard);
          dispatchRecipientUpdate(localStorage.getItem('default_recipient') || 'Người Phụ Nữ Tuyệt Vời');
          updateProfile();
          return;
        }
        if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          setTimeout(() => {
            if (activeAccount && activeAccount.id === session.user.id) {
              activeAccount.email = session.user.email || activeAccount.email;
              activeAccount.role = session.user.app_metadata?.role || '';
              updateProfile();
            }
            activateUser(session.user).catch(error => {
              console.error('Could not load account profile:', error);
              showToast(`⚠️ Không thể tải hồ sơ từ máy chủ: ${error.message}`);
            });
          }, 0);
        }
      });
    }
    updateProfile();

    if (authModal) {
      authModal.addEventListener('click', (event) => {
        if (event.target === authModal) closeAuthModal();
      });
    }
  }

  // ==========================================
  // 1. RECIPIENT PERSONALIZATION SYNC
  // ==========================================
  function setupRecipientSync() {
    const heroNameEl = document.getElementById('recipient-name');
    const letterToEl = document.getElementById('letter-recipient');
    const letterBodyEl = document.getElementById('letter-body');
    const cardInputTo = document.getElementById('card-input-to');
    const modalBackdrop = document.getElementById('recipient-modal');
    const modalInput = document.getElementById('modal-input-name');
    const btnOpenModal = document.getElementById('btn-open-recipient-modal');
    const btnQuickEdit = document.getElementById('btn-quick-edit');
    const btnModalCancel = document.getElementById('btn-modal-cancel');
    const btnModalSave = document.getElementById('btn-modal-save');
    const presetPills = document.querySelectorAll('.preset-pill');

    function updateRecipient(newName) {
      if (!newName || !newName.trim()) return;
      currentRecipient = newName.trim();

      if (heroNameEl) heroNameEl.textContent = currentRecipient;
      if (letterToEl) letterToEl.textContent = `Gửi ${currentRecipient} thân yêu,`;
      if (cardInputTo) {
        cardInputTo.value = currentRecipient;
        renderGreetingCard();
      }

      if (letterBodyEl) {
        letterBodyEl.innerHTML = `
          <p>Nhân Ngày Phụ nữ Việt Nam 20/10, xin gửi đến <strong>${escapeHtml(currentRecipient)}</strong> những lời chúc ngọt ngào, ấm áp và trọn vẹn nhất!</p>
          <p>Cảm ơn bạn đã luôn hiện diện, mang lại nụ cười, nguồn năng lượng tích cực và những điều dịu dàng nhất cho mọi người xung quanh.</p>
          <p>Chúc <strong>${escapeHtml(currentRecipient)}</strong> mỗi ngày trôi qua đều ngập tràn niềm vui, luôn xinh đẹp rạng ngời như những đóa hoa mùa thu, tự tin chạm đến mọi ước mơ và được yêu thương thật nhiều!</p>
        `;
      }
      document.dispatchEvent(new CustomEvent('account:recipient-changed', { detail: currentRecipient }));
    }

    document.addEventListener('account:set-recipient', event => {
      if (typeof event.detail === 'string') updateRecipient(event.detail);
    });

    function openModal() {
      if (modalInput) modalInput.value = currentRecipient;
      if (modalBackdrop) modalBackdrop.classList.add('open');
      if (modalInput) setTimeout(() => modalInput.focus(), 150);
    }

    function closeModal() {
      if (modalBackdrop) modalBackdrop.classList.remove('open');
    }

    if (btnOpenModal) btnOpenModal.addEventListener('click', openModal);
    if (btnQuickEdit) btnQuickEdit.addEventListener('click', openModal);
    if (btnModalCancel) btnModalCancel.addEventListener('click', closeModal);

    if (btnModalSave) {
      btnModalSave.addEventListener('click', () => {
        if (modalInput && modalInput.value.trim()) {
          updateRecipient(modalInput.value.trim());
          showToast(`✨ Đã cá nhân hóa: "${currentRecipient}"`);
        }
        closeModal();
      });
    }

    if (modalInput) {
      modalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          if (modalInput.value.trim()) {
            updateRecipient(modalInput.value.trim());
            showToast(`✨ Đã cá nhân hóa: "${currentRecipient}"`);
          }
          closeModal();
        } else if (e.key === 'Escape') {
          closeModal();
        }
      });
    }

    presetPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const name = pill.getAttribute('data-name');
        if (name && modalInput) modalInput.value = name;
      });
    });

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
      });
    }

    // Initial sync
    updateRecipient(currentRecipient);
  }

  // ==========================================
  // 2. BACKGROUND PARTICLES (PETALS & STARS)
  // ==========================================
  function setupBackgroundParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor(width / 35), 45);

    for (let i = 0; i < count; i++) {
      particles.push(generatePetal(width, height, true));
    }

    function generatePetal(w, h, randomY = false) {
      return {
        x: Math.random() * w,
        y: randomY ? Math.random() * h : -30,
        size: Math.random() * 10 + 8,
        speedY: Math.random() * 1.4 + 0.8,
        speedX: Math.random() * 1 - 0.5,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2,
        swing: Math.random() * 2.2,
        swingSpeed: Math.random() * 0.02 + 0.01,
        swingAngle: Math.random() * Math.PI * 2,
        color: Math.random() > 0.4 ? 'rgba(255, 117, 143, 0.72)' : 'rgba(255, 77, 109, 0.65)',
        type: Math.random() > 0.3 ? 'petal' : 'heart'
      };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.swingAngle += p.swingSpeed;
        p.x += Math.sin(p.swingAngle) * p.swing + p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === 'petal') {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-p.size / 2, -p.size, -p.size, p.size / 2, 0, p.size);
          ctx.bezierCurveTo(p.size, p.size / 2, p.size / 2, -p.size, 0, 0);
          ctx.fill();
        } else {
          // Heart shape
          ctx.fillStyle = p.color;
          ctx.beginPath();
          const s = p.size * 0.65;
          ctx.moveTo(0, s / 4);
          ctx.quadraticCurveTo(0, 0, s / 2, 0);
          ctx.quadraticCurveTo(s, 0, s, s / 2);
          ctx.quadraticCurveTo(s, s, 0, s * 1.4);
          ctx.quadraticCurveTo(-s, s, -s, s / 2);
          ctx.quadraticCurveTo(-s, 0, -s / 2, 0);
          ctx.quadraticCurveTo(0, 0, 0, s / 4);
          ctx.fill();
        }

        ctx.restore();

        if (p.y > height + 30 || p.x < -40 || p.x > width + 40) {
          particles[idx] = generatePetal(width, height, false);
        }
      });

      requestAnimationFrame(draw);
    }

    draw();
  }

  // ==========================================
  // 3. PARAMETRIC 3D GLOWING HEART CANVAS
  // ==========================================
  function setupParametricHeartCanvas() {
    const canvas = document.getElementById('heart-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth || 450);
    let height = (canvas.height = canvas.parentElement.clientHeight || 320);

    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    });

    const points = [];
    const totalPoints = 420;

    // Mathematical heart parametric curve: x = 16 sin^3(t), y = -(13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t))
    for (let i = 0; i < totalPoints; i++) {
      const t = (Math.PI * 2 * i) / totalPoints;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      points.push({
        baseX: x,
        baseY: y,
        noise: (Math.random() - 0.5) * 1.5,
        sparkle: Math.random() * Math.PI * 2,
        color: Math.random() > 0.5 ? '#ff4d6d' : '#ff758f'
      });
    }

    let beat = 0;

    function renderHeart() {
      ctx.clearRect(0, 0, width, height);

      beat += 0.045;
      // Heartbeat pulse cycle (two gentle pulses)
      const pulse = 1 + Math.pow(Math.sin(beat), 8) * 0.12 + Math.pow(Math.sin(beat + 0.3), 12) * 0.06;
      const scale = (Math.min(width, height) / 38) * pulse;

      const centerX = width / 2;
      const centerY = height / 2 + 5;

      // Outer glow
      const radialGrad = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 120 * pulse);
      radialGrad.addColorStop(0, 'rgba(255, 77, 109, 0.25)');
      radialGrad.addColorStop(0.5, 'rgba(255, 117, 143, 0.12)');
      radialGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radialGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw glowing heart points
      points.forEach(p => {
        p.sparkle += 0.05;
        const px = centerX + (p.baseX + p.noise) * scale;
        const py = centerY + (p.baseY + p.noise) * scale;
        const pSize = Math.max(1.5, (Math.sin(p.sparkle) + 1.2) * 2.2);

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fill();
      });

      // Center glowing text
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(201, 24, 74, 0.8)';
      ctx.shadowBlur = 12;
      ctx.fillText('20 / 10', centerX, centerY - 2);
      ctx.shadowBlur = 0;

      requestAnimationFrame(renderHeart);
    }

    renderHeart();
  }

  // ==========================================
  // 4. 3D GIFT BOX WITH CONFETTI
  // ==========================================
  function setup3DGiftBox() {
    const triggerArea = document.getElementById('gift-box-trigger');
    const giftBox = document.getElementById('gift-box-3d');
    const secretLetter = document.getElementById('secret-letter');
    const hintText = document.getElementById('gift-box-hint');
    const btnHeroGift = document.getElementById('btn-hero-gift');

    function toggleGift() {
      if (!giftBox) return;

      if (!giftBox.classList.contains('opened')) {
        giftBox.classList.add('opened');
        burstConfettiParticles();
        playChimeSound();
        if (secretLetter) {
          secretLetter.style.display = 'block';
          setTimeout(() => {
            secretLetter.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 350);
        }
        if (hintText) hintText.innerHTML = '🎉 Hộp quà đã mở! Chúc bạn ngập tràn yêu thương!';
        showToast('🎁 Bạn vừa mở bức thư bí mật ngày 20/10!');
      } else {
        giftBox.classList.remove('opened');
        if (secretLetter) secretLetter.style.display = 'none';
        if (hintText) hintText.innerHTML = '✨ Chạm vào hộp quà để mở điều kỳ diệu! ✨';
      }
    }

    if (triggerArea) triggerArea.addEventListener('click', toggleGift);
    if (btnHeroGift) {
      btnHeroGift.addEventListener('click', (e) => {
        const giftSec = document.getElementById('gift-section');
        if (giftSec) {
          giftSec.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            if (giftBox && !giftBox.classList.contains('opened')) toggleGift();
          }, 450);
        }
      });
    }
  }

  // Confetti Burst Effect
  function burstConfettiParticles() {
    const colors = ['#ff4d6d', '#ffb703', '#ff758f', '#ffd166', '#06d6a0', '#c9184a', '#ffffff'];
    const total = 42;

    for (let i = 0; i < total; i++) {
      const conf = document.createElement('div');
      conf.style.position = 'fixed';
      conf.style.width = `${Math.random() * 8 + 6}px`;
      conf.style.height = `${Math.random() * 10 + 6}px`;
      conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      conf.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      conf.style.left = `${window.innerWidth / 2}px`;
      conf.style.top = `${window.innerHeight / 2 - 40}px`;
      conf.style.zIndex = '99999';
      conf.style.pointerEvents = 'none';

      document.body.appendChild(conf);

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 240 + 80;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance;

      conf.animate([
        { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
        { transform: `translate(${destX}px, ${destY + 120}px) scale(0.3) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: 1300 + Math.random() * 700,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
      }).onfinish = () => conf.remove();
    }
  }

  // ==========================================
  // 5. WISHES DIRECTORY & TABS
  // ==========================================
  function setupWishesTabs() {
    const tabs = document.querySelectorAll('.tab-chip');
    const grid = document.getElementById('wishes-grid');
    if (!grid) return;

    function renderCategory(cat) {
      const items = wishesDatabase[cat] || wishesDatabase.me;
      grid.innerHTML = items.map((item, idx) => `
        <div class="wish-item-card">
          <div class="wish-card-top">
            <span class="wish-card-icon">${item.icon}</span>
            <h4 class="wish-card-title">${escapeHtml(item.title)}</h4>
          </div>
          <p class="wish-card-text">${escapeHtml(item.text)}</p>
          <div class="wish-card-buttons">
            <button class="btn-card-action btn-copy" data-action="copy" data-index="${idx}" data-cat="${cat}">
              📋 Sao chép
            </button>
            <button class="btn-card-action btn-use" data-action="use" data-index="${idx}" data-cat="${cat}">
              💌 Làm thiệp
            </button>
          </div>
        </div>
      `).join('');
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.getAttribute('data-category');
        renderCategory(cat);
      });
    });

    // Delegated click for copy & use buttons
    grid.addEventListener('click', (e) => {
      const target = e.target.closest('button[data-action]');
      if (!target) return;

      const action = target.getAttribute('data-action');
      const cat = target.getAttribute('data-cat');
      const idx = parseInt(target.getAttribute('data-index'), 10);
      const item = wishesDatabase[cat] && wishesDatabase[cat][idx];

      if (!item) return;

      if (action === 'copy') {
        copyTextToClipboard(item.text);
      } else if (action === 'use') {
        const cardMsgInput = document.getElementById('card-input-message');
        if (cardMsgInput) {
          cardMsgInput.value = item.text;
          renderGreetingCard();
          const creatorSec = document.getElementById('card-creator-section');
          if (creatorSec) creatorSec.scrollIntoView({ behavior: 'smooth' });
          showToast('💌 Đã chuyển lời chúc vào khung tạo thiệp!');
        }
      }
    });

    // Initial render
    renderCategory('me');
  }

  function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('📋 Đã sao chép lời chúc vào khay nhớ tạm!');
      }).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('📋 Đã sao chép lời chúc!');
  }

  // ==========================================
  // 6. CANVAS CARD CREATOR & EXPORTER
  // ==========================================
  let renderGreetingCard = function () {};

  function setupCardCreator() {
    const canvas = document.getElementById('card-canvas');
    const inputTo = document.getElementById('card-input-to');
    const inputFrom = document.getElementById('card-input-from');
    const selectTheme = document.getElementById('card-theme-select');
    const inputMsg = document.getElementById('card-input-message');
    const btnDownload = document.getElementById('btn-download-card');

    if (!canvas) return;

    renderGreetingCard = function () {
      const ctx = canvas.getContext('2d');
      const width = 800;
      const height = 560;

      canvas.width = width;
      canvas.height = height;

      const toText = (inputTo && inputTo.value.trim()) || currentRecipient;
      const fromText = (inputFrom && inputFrom.value.trim()) || 'Người gửi yêu thương';
      const msgText = (inputMsg && inputMsg.value.trim()) ||
        'Nhân ngày 20/10, chúc bạn luôn vui vẻ, rạng rỡ và tràn đầy niềm hạnh phúc bên những người thân thương nhất!';
      const theme = (selectTheme && selectTheme.value) || 'rose';

      // 1. Color Palettes based on theme
      let bgGrad = ctx.createLinearGradient(0, 0, width, height);
      let borderColor = '#ff4d6d';
      let titleColor = '#c9184a';
      let accentColor = '#ff758f';

      if (theme === 'gold') {
        bgGrad.addColorStop(0, '#fffdf5');
        bgGrad.addColorStop(1, '#ffeed4');
        borderColor = '#d48806';
        titleColor = '#873800';
        accentColor = '#faad14';
      } else if (theme === 'violet') {
        bgGrad.addColorStop(0, '#fbf5ff');
        bgGrad.addColorStop(1, '#eedbff');
        borderColor = '#9254de';
        titleColor = '#531dab';
        accentColor = '#b37feb';
      } else if (theme === 'emerald') {
        bgGrad.addColorStop(0, '#f6ffed');
        bgGrad.addColorStop(1, '#d9f7be');
        borderColor = '#52c41a';
        titleColor = '#237804';
        accentColor = '#73d13d';
      } else {
        // Rose default
        bgGrad.addColorStop(0, '#fff5f7');
        bgGrad.addColorStop(1, '#ffd6e0');
        borderColor = '#ff4d6d';
        titleColor = '#c9184a';
        accentColor = '#ff758f';
      }

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Decorative Double Border
      ctx.lineWidth = 12;
      ctx.strokeStyle = borderColor;
      ctx.strokeRect(18, 18, width - 36, height - 36);

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.strokeRect(28, 28, width - 56, height - 56);

      // Floral corners
      drawFloralCorner(ctx, 42, 42, borderColor, accentColor);
      drawFloralCorner(ctx, width - 42, 42, borderColor, accentColor);
      drawFloralCorner(ctx, 42, height - 42, borderColor, accentColor);
      drawFloralCorner(ctx, width - 42, height - 42, borderColor, accentColor);

      // 3. Header Texts
      ctx.textAlign = 'center';

      ctx.font = 'bold 18px "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = borderColor;
      ctx.fillText('VIETNAMESE WOMEN\'S DAY • 20/10', width / 2, 75);

      ctx.font = 'bold 38px "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = titleColor;
      ctx.fillText('Chúc Mừng 20 Tháng 10', width / 2, 125);

      // Recipient
      ctx.font = 'bold 24px "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = '#2b1722';
      ctx.fillText(`Thân gửi: ${toText}`, width / 2, 175);

      // Decorative divider
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 140, 195);
      ctx.lineTo(width / 2 + 140, 195);
      ctx.stroke();

      ctx.font = '20px Arial';
      ctx.fillStyle = borderColor;
      ctx.fillText('❤', width / 2, 202);

      // 4. Message Content (Wrapped)
      ctx.font = '20px "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = '#3a202c';
      wrapCanvasText(ctx, msgText, width / 2, 255, width - 180, 32);

      // 5. Signature Footer
      ctx.textAlign = 'right';
      ctx.font = 'italic 18px "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = '#7a5468';
      ctx.fillText('Thân ái gửi tặng,', width - 80, height - 90);

      ctx.font = 'bold 22px "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = titleColor;
      ctx.fillText(fromText, width - 80, height - 60);

      ctx.textAlign = 'left';
      ctx.font = '15px "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = '#9c6e84';
      ctx.fillText('🌸 Ngày Phụ Nữ Việt Nam 20/10', 80, height - 60);
    };

    function drawFloralCorner(ctx, x, y, mainColor, leafColor) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = mainColor;
      ctx.beginPath();
      ctx.arc(0, 0, 7, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.beginPath();
        ctx.ellipse(12, 0, 8, 4, 0, 0, Math.PI * 2);
        ctx.fillStyle = leafColor;
        ctx.fill();
      }
      ctx.restore();
    }

    function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
      const paragraphs = text.split('\n');
      let currentY = y;

      for (let p = 0; p < paragraphs.length; p++) {
        const words = paragraphs[p].split(' ');
        let line = '';

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line.trim(), x, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line.trim(), x, currentY);
        currentY += lineHeight;
      }
    }

    if (inputTo) inputTo.addEventListener('input', renderGreetingCard);
    if (inputFrom) inputFrom.addEventListener('input', renderGreetingCard);
    if (selectTheme) selectTheme.addEventListener('change', renderGreetingCard);
    if (inputMsg) inputMsg.addEventListener('input', renderGreetingCard);

    if (btnDownload) {
      btnDownload.addEventListener('click', () => {
        renderGreetingCard();
        try {
          const toName = (inputTo && inputTo.value.trim()) || currentRecipient;
          const cleanName = toName.replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '-');
          const link = document.createElement('a');
          link.download = `thiep-chuc-mung-20-10-${cleanName}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          showToast('📥 Đã tải xuống ảnh thiệp 20/10 chất lượng cao!');
        } catch (e) {
          showToast('⚠️ Không thể tải ảnh trực tiếp, bạn hãy chụp ảnh màn hình nhé!');
        }
      });
    }

    // Initial render
    renderGreetingCard();
  }

  // ==========================================
  // 7. INTERACTIVE FLOWER & HEART GARDEN
  // ==========================================
  function setupInteractiveGarden() {
    const counterDisplay = document.getElementById('counter-flower');
    const spawnButtons = document.querySelectorAll('.btn-spawn');

    spawnButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        flowerCount++;
        if (counterDisplay) counterDisplay.textContent = flowerCount.toLocaleString();

        const type = btn.getAttribute('data-flower');
        const icon = type === 'rose' ? '🌹' : (type === 'heart' ? '💖' : '💐');

        spawnFlyingEmoji(icon, e.clientX, e.clientY);
        playPopSound();

        // Celebration milestone
        if (flowerCount % 10 === 0) {
          burstConfettiParticles();
          showToast(`🎉 Tuyệt vời! Bạn đã gửi mốc ${flowerCount} đóa hoa yêu thương!`);
        }
      });
    });
  }

  function spawnFlyingEmoji(emoji, x, y) {
    const el = document.createElement('div');
    el.className = 'flying-flower-item';
    el.textContent = emoji;

    const posX = x || (window.innerWidth / 2);
    const posY = y || (window.innerHeight / 2);

    el.style.left = `${posX - 20}px`;
    el.style.top = `${posY - 20}px`;
    document.body.appendChild(el);

    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 1600);
  }

  // Click anywhere on page to create floating mini hearts
  function setupGlobalClickHearts() {
    document.addEventListener('click', (e) => {
      // Don't trigger if clicking interactive buttons/inputs
      if (e.target.closest('button, input, textarea, select, a, .tab-chip, .modal-dialog')) {
        return;
      }
      const icons = ['🌸', '💖', '✨', '🌷', '💕'];
      const icon = icons[Math.floor(Math.random() * icons.length)];
      spawnFlyingEmoji(icon, e.clientX, e.clientY);
    });
  }

  // ==========================================
  // 8. FORTUNE / COMPLIMENT WHEEL
  // ==========================================
  function setupFortuneWheel() {
    const quoteEl = document.getElementById('fortune-quote');
    const btnDraw = document.getElementById('btn-draw-fortune');
    if (!btnDraw || !quoteEl) return;

    btnDraw.addEventListener('click', () => {
      quoteEl.style.opacity = '0';
      playPopSound();

      setTimeout(() => {
        const randomIdx = Math.floor(Math.random() * fortuneQuotes.length);
        quoteEl.textContent = fortuneQuotes[randomIdx];
        quoteEl.style.opacity = '1';
        burstConfettiParticles();
      }, 250);
    });
  }

  // ==========================================
  // 9. WEB AUDIO API SYNTHESIZER (MUSIC & SOUNDS)
  // ==========================================
  function initAudioContext() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioContext = new AudioCtx();
    }
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }

  function playPopSound() {
    initAudioContext();
    if (!audioContext) return;
    try {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);

      gain.gain.setValueAtTime(0.2, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + 0.11);
    } catch (error) {
      console.warn('Could not play pop sound:', error);
    }
  }

  function playChimeSound() {
    initAudioContext();
    if (!audioContext) return;
    try {
      const frequencies = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      frequencies.forEach((freq, idx) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const startTime = audioContext.currentTime + (idx * 0.08);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.22, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.45);

        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.48);
      });
    } catch (error) {
      console.warn('Could not play chime sound:', error);
    }
  }

  // ==========================================
  // 9. MUSIC SYSTEM: PRESETS, UPLOAD & SYNTHESIZER
  // ==========================================
  const presetMelodies = {
    'yeu-thuong': {
      title: 'Yêu Thương Chẳng Là Mãi Mãi (DC Tâm)',
      notes: [
        { freq: 659.25, dur: 0.36 }, { freq: 659.25, dur: 0.36 }, { freq: 659.25, dur: 0.36 }, { freq: 587.33, dur: 0.36 }, { freq: 523.25, dur: 0.55 },
        { freq: 523.25, dur: 0.32 }, { freq: 587.33, dur: 0.32 }, { freq: 587.33, dur: 0.32 }, { freq: 587.33, dur: 0.32 }, { freq: 659.25, dur: 0.40 }, { freq: 523.25, dur: 0.70 },
        { freq: 523.25, dur: 0.32 }, { freq: 659.25, dur: 0.36 }, { freq: 659.25, dur: 0.36 }, { freq: 659.25, dur: 0.36 }, { freq: 783.99, dur: 0.40 }, { freq: 659.25, dur: 0.36 },
        { freq: 587.33, dur: 0.32 }, { freq: 523.25, dur: 0.32 }, { freq: 587.33, dur: 0.36 }, { freq: 659.25, dur: 0.36 }, { freq: 587.33, dur: 0.75 },
        { freq: 659.25, dur: 0.36 }, { freq: 659.25, dur: 0.36 }, { freq: 659.25, dur: 0.36 }, { freq: 587.33, dur: 0.36 }, { freq: 523.25, dur: 0.55 },
        { freq: 523.25, dur: 0.32 }, { freq: 587.33, dur: 0.32 }, { freq: 587.33, dur: 0.32 }, { freq: 587.33, dur: 0.32 }, { freq: 659.25, dur: 0.40 }, { freq: 523.25, dur: 0.70 },
        { freq: 523.25, dur: 0.32 }, { freq: 659.25, dur: 0.36 }, { freq: 659.25, dur: 0.36 }, { freq: 659.25, dur: 0.36 }, { freq: 783.99, dur: 0.40 }, { freq: 659.25, dur: 0.36 },
        { freq: 587.33, dur: 0.32 }, { freq: 523.25, dur: 0.32 }, { freq: 587.33, dur: 0.36 }, { freq: 659.25, dur: 0.36 }, { freq: 587.33, dur: 0.75 },
        { freq: 440.00, dur: 0.32 }, { freq: 523.25, dur: 0.32 }, { freq: 587.33, dur: 0.36 }, { freq: 659.25, dur: 0.36 }, { freq: 783.99, dur: 0.45 },
        { freq: 783.99, dur: 0.35 }, { freq: 659.25, dur: 0.35 }, { freq: 587.33, dur: 0.35 }, { freq: 523.25, dur: 0.35 }, { freq: 587.33, dur: 0.65 },
        { freq: 659.25, dur: 0.35 }, { freq: 659.25, dur: 0.35 }, { freq: 587.33, dur: 0.35 }, { freq: 523.25, dur: 0.35 }, { freq: 587.33, dur: 0.50 },
        { freq: 523.25, dur: 0.32 }, { freq: 440.00, dur: 0.32 }, { freq: 440.00, dur: 0.32 }, { freq: 523.25, dur: 0.36 }, { freq: 587.33, dur: 0.55 },
        { freq: 523.25, dur: 0.36 }, { freq: 587.33, dur: 0.36 }, { freq: 659.25, dur: 0.45 }, { freq: 587.33, dur: 0.36 }, { freq: 523.25, dur: 0.45 },
        { freq: 440.00, dur: 0.45 }, { freq: 440.00, dur: 0.45 }, { freq: 523.25, dur: 1.10 }
      ]
    },
    'anh-nang': {
      title: 'Ánh Nắng Của Anh (Piano)',
      notes: [
        { freq: 392.00, dur: 0.35 }, { freq: 392.00, dur: 0.35 }, { freq: 523.25, dur: 0.40 }, { freq: 523.25, dur: 0.40 }, { freq: 523.25, dur: 0.40 },
        { freq: 493.88, dur: 0.35 }, { freq: 523.25, dur: 0.35 }, { freq: 587.33, dur: 0.45 }, { freq: 523.25, dur: 0.40 }, { freq: 493.88, dur: 0.40 },
        { freq: 440.00, dur: 0.35 }, { freq: 392.00, dur: 0.45 }, { freq: 523.25, dur: 0.35 }, { freq: 587.33, dur: 0.35 },
        { freq: 659.25, dur: 0.45 }, { freq: 659.25, dur: 0.40 }, { freq: 587.33, dur: 0.35 }, { freq: 523.25, dur: 0.45 }, { freq: 587.33, dur: 0.85 },
        { freq: 523.25, dur: 0.40 }, { freq: 587.33, dur: 0.40 }, { freq: 659.25, dur: 0.50 }, { freq: 783.99, dur: 0.50 }, { freq: 659.25, dur: 0.90 }
      ]
    },
    'canon': {
      title: 'Canon in D (Music Box Lofi)',
      notes: [
        { freq: 587.33, dur: 0.45 }, { freq: 440.00, dur: 0.45 }, { freq: 493.88, dur: 0.45 }, { freq: 369.99, dur: 0.45 },
        { freq: 392.00, dur: 0.45 }, { freq: 293.66, dur: 0.45 }, { freq: 392.00, dur: 0.45 }, { freq: 440.00, dur: 0.45 },
        { freq: 587.33, dur: 0.35 }, { freq: 659.25, dur: 0.35 }, { freq: 739.99, dur: 0.40 }, { freq: 659.25, dur: 0.35 },
        { freq: 587.33, dur: 0.40 }, { freq: 493.88, dur: 0.40 }, { freq: 440.00, dur: 0.45 }, { freq: 587.33, dur: 0.80 }
      ]
    },
    'diu-dang': {
      title: 'Giai Điệu Dịu Dàng 20/10',
      notes: [
        { freq: 523.25, dur: 0.40 }, { freq: 659.25, dur: 0.40 }, { freq: 783.99, dur: 0.40 }, { freq: 659.25, dur: 0.40 },
        { freq: 587.33, dur: 0.40 }, { freq: 698.46, dur: 0.40 }, { freq: 880.00, dur: 0.40 }, { freq: 698.46, dur: 0.40 },
        { freq: 493.88, dur: 0.40 }, { freq: 587.33, dur: 0.40 }, { freq: 783.99, dur: 0.40 }, { freq: 587.33, dur: 0.40 },
        { freq: 523.25, dur: 0.80 }, { freq: 659.25, dur: 0.40 }, { freq: 783.99, dur: 0.80 }
      ]
    }
  };

  let activeSongKey = 'yeu-thuong';
  let musicMode = 'synth'; // 'synth' | 'audio'
  let melodyIndex = 0;

  function playNextMelodyNote() {
    if (!isMusicPlaying || musicMode !== 'synth' || !audioContext) return;
    try {
      const melodyData = presetMelodies[activeSongKey] || presetMelodies['yeu-thuong'];
      const notes = melodyData.notes;
      const note = notes[melodyIndex % notes.length];
      melodyIndex++;

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = 'triangle'; // Âm sắc ấm áp như đàn piano / music box
      osc.frequency.setValueAtTime(note.freq, audioContext.currentTime);

      gain.gain.setValueAtTime(0.16, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + note.dur * 1.15);

      osc.connect(gain);
      gain.connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + note.dur * 1.2);

      musicTimeout = setTimeout(playNextMelodyNote, note.dur * 1000);
    } catch (error) {
      console.warn('Could not play synthesized music note:', error);
    }
  }

  function setupAudioSynthesizer() {
    const btnMusic = document.getElementById('btn-music');
    const audioPlayer = document.getElementById('bg-music-player');
    const btnOpenMusicModal = document.getElementById('btn-open-music-modal');
    const musicModal = document.getElementById('music-modal');
    const btnCloseMusicModal = document.getElementById('btn-close-music-modal');
    const fileInput = document.getElementById('music-file-input');
    const btnTriggerUpload = document.getElementById('btn-trigger-upload');
    const fileNameDisplay = document.getElementById('music-file-name');
    const presetSongButtons = document.querySelectorAll('.preset-song-item');
    const musicUrlInput = document.getElementById('music-url-input');
    const btnApplyUrl = document.getElementById('btn-apply-url');

    if (!btnMusic) return;

    // Start playing current source
    function startMusic() {
      initAudioContext();
      isMusicPlaying = true;
      btnMusic.classList.add('playing');
      btnMusic.querySelector('.btn-icon').textContent = '🎶';
      btnMusic.querySelector('.btn-text').textContent = 'Đang phát';

      if (musicMode === 'audio' && audioPlayer && audioPlayer.src) {
        audioPlayer.play().catch(() => {
          // Fallback to synth if audio fails
          musicMode = 'synth';
          melodyIndex = 0;
          playNextMelodyNote();
        });
      } else {
        musicMode = 'synth';
        if (audioPlayer) audioPlayer.pause();
        clearTimeout(musicTimeout);
        melodyIndex = 0;
        playNextMelodyNote();
      }
    }

    // Stop music
    function stopMusic() {
      isMusicPlaying = false;
      btnMusic.classList.remove('playing');
      btnMusic.querySelector('.btn-icon').textContent = '🎵';
      btnMusic.querySelector('.btn-text').textContent = 'Bật nhạc';
      if (audioPlayer) audioPlayer.pause();
      clearTimeout(musicTimeout);
      showToast('🔇 Đã tắt nhạc nền');
    }

    // Toggle main button
    btnMusic.addEventListener('click', () => {
      if (isMusicPlaying) {
        stopMusic();
      } else {
        startMusic();
        if (musicMode === 'audio') {
          showToast('🎶 Đang phát bài hát của bạn!');
        } else {
          const title = presetMelodies[activeSongKey] ? presetMelodies[activeSongKey].title : 'Giai điệu 20/10';
          showToast(`🎶 Đang phát: "${title}"!`);
        }
      }
    });

    // Open & Close Music Modal
    function openMusicModal() {
      if (musicModal) musicModal.classList.add('open');
    }
    function closeMusicModal() {
      if (musicModal) musicModal.classList.remove('open');
    }

    if (btnOpenMusicModal) btnOpenMusicModal.addEventListener('click', openMusicModal);
    if (btnCloseMusicModal) btnCloseMusicModal.addEventListener('click', closeMusicModal);
    if (musicModal) {
      musicModal.addEventListener('click', (e) => {
        if (e.target === musicModal) closeMusicModal();
      });
    }

    // Upload custom MP3 from computer
    if (btnTriggerUpload && fileInput) {
      btnTriggerUpload.addEventListener('click', () => fileInput.click());

      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          try {
            const objectUrl = URL.createObjectURL(file);
            if (audioPlayer) {
              audioPlayer.src = objectUrl;
              audioPlayer.load();
            }
            musicMode = 'audio';
            if (fileNameDisplay) fileNameDisplay.textContent = `🎵 ${file.name}`;
            presetSongButtons.forEach(btn => btn.classList.remove('active'));

            startMusic();
            showToast(`🎉 Đã tải lên và phát: "${file.name}"!`);
          } catch (err) {
            showToast('⚠️ Không thể tải file nhạc này, vui lòng thử file MP3 khác!');
          }
        }
      });
    }

    // Choose from Preset Synthesizer Songs
    presetSongButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        presetSongButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        activeSongKey = btn.getAttribute('data-song');
        musicMode = 'synth';
        if (audioPlayer) audioPlayer.pause();
        if (fileNameDisplay) fileNameDisplay.textContent = 'Chưa chọn file';

        clearTimeout(musicTimeout);
        melodyIndex = 0;
        startMusic();

        const title = presetMelodies[activeSongKey] ? presetMelodies[activeSongKey].title : 'Giai điệu 20/10';
        showToast(`🎶 Đang phát: "${title}"!`);
      });
    });

    // Apply online audio URL
    if (btnApplyUrl && musicUrlInput) {
      btnApplyUrl.addEventListener('click', () => {
        const url = musicUrlInput.value.trim();
        if (!url) {
          showToast('⚠️ Vui lòng dán đường link bài hát MP3!');
          return;
        }

        if (audioPlayer) {
          audioPlayer.src = url;
          audioPlayer.load();
        }
        musicMode = 'audio';
        presetSongButtons.forEach(b => b.classList.remove('active'));
        if (fileNameDisplay) fileNameDisplay.textContent = `🔗 Link online`;

        startMusic();
        showToast('🎶 Đang kết nối và phát bài hát từ đường link online!');
      });
    }
  }

  // ==========================================
  // 10. ADMIN PERSISTENCE & MANAGEMENT SYSTEM
  // ==========================================
  function loadAdminPersistedSettings() {
    const savedTitle = localStorage.getItem('site_title');
    if (savedTitle) {
      const heroTitleEl = document.querySelector('.hero-main-title');
      if (heroTitleEl) heroTitleEl.textContent = savedTitle;
      const adminTitleInput = document.getElementById('admin-setting-title');
      if (adminTitleInput) adminTitleInput.value = savedTitle;
    }

    const savedRecipient = localStorage.getItem('default_recipient');
    if (savedRecipient) {
      currentRecipient = savedRecipient;
      const adminRecipientInput = document.getElementById('admin-setting-recipient');
      if (adminRecipientInput) adminRecipientInput.value = savedRecipient;
      const recipientElement = document.getElementById('recipient-name');
      if (recipientElement) recipientElement.textContent = savedRecipient;
      const letterRecipient = document.getElementById('letter-recipient');
      if (letterRecipient) letterRecipient.textContent = `Gửi ${savedRecipient} thân yêu,`;
    }

    const savedFlowers = localStorage.getItem('flower_count');
    if (savedFlowers !== null) {
      const parsedFlowers = Number.parseInt(savedFlowers, 10);
      if (Number.isInteger(parsedFlowers) && parsedFlowers >= 0) flowerCount = parsedFlowers;
      const counterEl = document.getElementById('counter-flower');
      if (counterEl) counterEl.textContent = flowerCount.toLocaleString();
      const adminFlowerInput = document.getElementById('admin-setting-flowers');
      if (adminFlowerInput) adminFlowerInput.value = flowerCount;
    }

    const savedLetter = localStorage.getItem('letter_body');
    if (savedLetter) {
      const adminLetterInput = document.getElementById('admin-setting-letter');
      if (adminLetterInput) adminLetterInput.value = savedLetter;
      const letterBody = document.getElementById('letter-body');
      if (letterBody) {
        letterBody.innerHTML = savedLetter.split('\n\n')
          .map(paragraph => `<p>${escapeHtml(paragraph)}</p>`)
          .join('');
      }
    }

    try {
      const savedWishes = localStorage.getItem('custom_wishes');
      if (savedWishes) {
        const parsed = JSON.parse(savedWishes);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
          throw new Error('Dữ liệu lời chúc đã lưu không hợp lệ.');
        }
        Object.keys(parsed).forEach(cat => {
          if (wishesDatabase[cat] && Array.isArray(parsed[cat])) {
            wishesDatabase[cat] = [...wishesDatabase[cat], ...parsed[cat]];
          }
        });
      }
    } catch (error) {
      console.error('Could not load custom wishes:', error);
      showToast(`⚠️ Không thể tải lời chúc đã lưu: ${error.message}`);
    }
  }

  function setupAdminSystem() {
    const adminDashboardModal = document.getElementById('admin-dashboard-modal');
    const btnCloseDashboard = document.getElementById('btn-close-admin-dashboard');
    const btnOpenAdminControls = document.getElementById('btn-open-admin-controls');
    const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
    const btnSaveGeneral = document.getElementById('btn-save-general-settings');
    const btnAddWish = document.getElementById('btn-add-custom-wish');
    const btnResetAll = document.getElementById('btn-reset-all-settings');
    let isAdmin = false;
    let isLoggedIn = false;

    if (btnCloseDashboard && adminDashboardModal) {
      btnCloseDashboard.addEventListener('click', () => adminDashboardModal.classList.remove('open'));
      adminDashboardModal.addEventListener('click', (e) => {
        if (e.target === adminDashboardModal) adminDashboardModal.classList.remove('open');
      });
    }

    document.addEventListener('account:role-changed', event => {
      isAdmin = event.detail?.isAdmin === true;
      isLoggedIn = event.detail?.isLoggedIn === true;
      if (!isAdmin && adminDashboardModal) adminDashboardModal.classList.remove('open');
    });

    if (btnOpenAdminControls) {
      btnOpenAdminControls.addEventListener('click', () => {
        if (!isAdmin) {
          showToast('⚠️ Tài khoản này không có quyền quản trị.');
          return;
        }
        if (adminDashboardModal) adminDashboardModal.classList.add('open');
      });
    }

    adminTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        adminTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.getAttribute('data-tab');
        document.querySelectorAll('.admin-tab-pane').forEach(p => p.classList.remove('active'));
        const pane = document.getElementById(`admin-tab-${tab}`);
        if (pane) pane.classList.add('active');
      });
    });

    if (btnSaveGeneral) {
      btnSaveGeneral.addEventListener('click', () => {
        const titleVal = document.getElementById('admin-setting-title')?.value.trim() || '';
        const recipientVal = document.getElementById('admin-setting-recipient')?.value.trim() || '';
        const flowersVal = document.getElementById('admin-setting-flowers')?.value.trim() || '';
        const letterVal = document.getElementById('admin-setting-letter')?.value.trim() || '';

        if (titleVal) {
          localStorage.setItem('site_title', titleVal);
          const heroTitle = document.querySelector('.hero-main-title');
          if (heroTitle) heroTitle.textContent = titleVal;
        }

        if (recipientVal) {
          localStorage.setItem('default_recipient', recipientVal);
          if (!isLoggedIn) {
            currentRecipient = recipientVal;
            const heroRec = document.getElementById('recipient-name');
            if (heroRec) heroRec.textContent = currentRecipient;
            const letterTo = document.getElementById('letter-recipient');
            if (letterTo) letterTo.textContent = `Gửi ${currentRecipient} thân yêu,`;
            const cardTo = document.getElementById('card-input-to');
            if (cardTo) {
              cardTo.value = currentRecipient;
              renderGreetingCard();
            }
          } else {
            showToast('ℹ️ Tên người nhận mặc định đã lưu; dữ liệu tài khoản đang đăng nhập không bị thay đổi.');
          }
        }

        if (flowersVal) {
          const parsedFlowers = Number.parseInt(flowersVal, 10);
          if (!Number.isInteger(parsedFlowers) || parsedFlowers < 0) {
            showToast('⚠️ Số hoa phải là số nguyên không âm.');
            return;
          }
          localStorage.setItem('flower_count', String(parsedFlowers));
          flowerCount = parsedFlowers;
          const flowerCounter = document.getElementById('counter-flower');
          if (flowerCounter) flowerCounter.textContent = flowerCount.toLocaleString();
        }

        if (letterVal) {
          localStorage.setItem('letter_body', letterVal);
          const letterBody = document.getElementById('letter-body');
          if (letterBody) {
            letterBody.innerHTML = letterVal.split('\n\n').map(p => `<p>${escapeHtml(p)}</p>`).join('');
          }
        }

        showToast('💾 Đã lưu cấu hình và cập nhật trang web!');
      });
    }

    if (btnAddWish) {
      btnAddWish.addEventListener('click', () => {
        const catInput = document.getElementById('admin-wish-cat');
        const cat = catInput ? catInput.value : '';
        const titleInput = document.getElementById('admin-wish-title');
        const textInput = document.getElementById('admin-wish-text');
        const title = titleInput ? titleInput.value.trim() : '';
        const text = textInput ? textInput.value.trim() : '';

        if (!wishesDatabase[cat] || !title || !text) {
          showToast('⚠️ Vui lòng nhập đầy đủ tiêu đề và nội dung lời chúc!');
          return;
        }

        const newWish = { title, text, icon: '⭐' };
        wishesDatabase[cat].push(newWish);

        try {
          const savedWishes = JSON.parse(localStorage.getItem('custom_wishes') || '{}');
          if (!savedWishes || typeof savedWishes !== 'object' || Array.isArray(savedWishes)) {
            throw new Error('Dữ liệu lời chúc đã lưu không hợp lệ.');
          }
          if (!Array.isArray(savedWishes[cat])) savedWishes[cat] = [];
          savedWishes[cat].push(newWish);
          localStorage.setItem('custom_wishes', JSON.stringify(savedWishes));
        } catch (error) {
          wishesDatabase[cat].pop();
          showToast(`⚠️ Không thể lưu lời chúc: ${error.message}`);
          return;
        }

        const activeTab = document.querySelector('.tab-chip.active');
        if (activeTab && activeTab.getAttribute('data-category') === cat) {
          activeTab.click();
        }

        if (titleInput) titleInput.value = '';
        if (textInput) textInput.value = '';
        showToast('➕ Đã thêm lời chúc mới thành công!');
      });
    }

    if (btnResetAll) {
      btnResetAll.addEventListener('click', () => {
        if (confirm('Bạn có chắc muốn khôi phục toàn bộ cài đặt gốc của trang web?')) {
          localStorage.removeItem('site_title');
          localStorage.removeItem('default_recipient');
          localStorage.removeItem('flower_count');
          localStorage.removeItem('letter_body');
          localStorage.removeItem('custom_wishes');
          showToast('🔄 Đang khôi phục cài đặt gốc...');
          setTimeout(() => window.location.reload(), 800);
        }
      });
    }
  }

  // ==========================================
  // 11. TOAST NOTIFICATION UTILITY
  // ==========================================
  let toastTimer = null;
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('hide');
      setTimeout(() => toast.remove(), 350);
    }, 2800);
  }

  // Utility to escape HTML strings safely
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ==========================================
  // SAFE BOOTSTRAP
  // ==========================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApplication);
  } else {
    initApplication();
  }

})();
