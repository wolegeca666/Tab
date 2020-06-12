let that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.ul = this.main.querySelector('ul');
        this.tabsCon = this.main.querySelector('.tabsCon');
        this.add = this.main.querySelector('.tabAdd');
        this.init();
    }
    init() {
        this.updateNode();
        // init 初始化操作元素绑定事件
        this.add.onclick = this.addTab;
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.span[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    updateNode() {
        // 获取元素
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.del');
        this.span = this.main.querySelectorAll('li span:first-child');
    }
    // 1.切换
    toggleTab() {
        that.clearClass();
        this.className = 'liActive';
        that.sections[this.index].className = 'conActive';
    }
    clearClass() {
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 2.添加
    addTab() {
        that.clearClass();
        let li = '<li class="liActive"><span>新选项卡</span><span class="del">&times</span></li>';
        that.ul.insertAdjacentHTML('beforeend', li);
        let sel = '<section class="conActive">测试' + Math.round(Math.random() * 100) + '</section>';
        that.tabsCon.insertAdjacentHTML('beforeend', sel);
        that.init();
    }
    // 3.删除
    removeTab(e) {
        e.stopPropagation();
        let index = this.parentNode.index;
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        if (document.querySelector('.liActive')) return;
        index--;
        that.lis[index] && that.lis[index].click();

    }
    // 4.编辑
    editTab() {
        let str = this.innerHTML;
        // 禁止双击选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection().empty();
        this.innerHTML = '<input type="text" />';
        let input = this.children[0];
        input.value = str;
        input.select(); // 直接选定文本框的文字
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        };
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }
    }
}
new Tab('#tab');