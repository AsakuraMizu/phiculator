<script>
  import AdbWebUsbBackend from '@yume-chan/adb-backend-webusb';
  import Pagination from '../components/Pagination.svelte';
  import send from '../utils/toast';

  const supported = AdbWebUsbBackend.isSupported();
  if (!supported) {
    send({
      title: '错误',
      message:
        '您的浏览器不支持从 Android 设备导入所必需的 WebUSB 标准.<br />' +
        '请使用最新版本的 Google Chrome、Microsoft Edge 或其他基于 Chromium 的浏览器.<br/>' +
        '您可以参考 <a href="https://caniuse.com/webusb" target="_blank"><i>Can I use...</i></a> ' +
        '了解哪些浏览器支持 WebUSB 标准.',
      severity: 'critical',
    });
  }
</script>

<h1>Step 1. 准备</h1>
<ol>
  <li>
    在您的 Android 设备上启用 USB 调试.<br />
    由于篇幅限制，请自行搜索资料（可参考
    <a href="https://zhuanlan.zhihu.com/p/20896295" target="_blank">
      如何在安卓手机上打开USB调试模式 - 知乎
    </a>）.
  </li>
  <li>启动 Phigros.</li>
  <li>使用 USB 数据线将您的 Android 设备连接至此计算机.</li>
  <li>如果您的计算机上有 adb server 正在运行, 请使用 <code>adb kill-server</code> 将其关闭.</li>
</ol>
<Pagination next="/connect" disabled={!supported} />

<style>
  ol {
    text-align: left;
  }
</style>
