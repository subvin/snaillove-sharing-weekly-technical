/**
 * Created by Sky on 2015/12/11.
 */
(function ($, window, document) {

    var PLUGIN_NAME = 'emoji',
        VERSION = '1.1.0',
        DEFAULTS = {
            showTab: true,
            animation: 'fade',
            icons: []
        };

    window.emoji_index = 0;

    function Plugin(element, options) {
        this.$content = $(element);
        this.options = options;
        this.index = emoji_index;
        switch (options.animation) {
            case 'none':
                this.showFunc = 'show';
                this.hideFunc = 'hide';
                this.toggleFunc = 'toggle';
                break;
            case 'slide':
                this.showFunc = 'slideDown';
                this.hideFunc = 'slideUp';
                this.toggleFunc = 'slideToggle';
                break;
            case 'fade':
                this.showFunc = 'fadeIn';
                this.hideFunc = 'fadeOut';
                this.toggleFunc = 'fadeToggle';
                break;
            default :
                this.showFunc = 'fadeIn';
                this.hideFunc = 'fadeOut';
                this.toggleFunc = 'fadeToggle';
                break;
        }
        this._init();
    }

    Plugin.prototype = {
        _init: function () {
            var that = this;
            var btn = this.options.button;
            var newBtn,
                contentTop,
                contentLeft,
                btnTop,
                btnLeft;
            var ix = that.index;
            if (!btn) {
            	newBtn = '<input type="image" class="emoji_btn" id="emoji_btn_' + ix + '" src="data:image/gif;base64,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"/>';
                contentTop = this.$content.offset().top + this.$content.outerHeight() + 10;
                contentLeft = this.$content.offset().left + 2;
                $(newBtn).appendTo($('body'));
                $('#emoji_btn_' + ix).css({'bottom': 0 + 'px', 'left': 5 + 'px'});
                btn = '#emoji_btn_' + ix;
            }

            var showTab = this.options.showTab;
            var iconsGroup = this.options.icons;
            var groupLength = iconsGroup.length;
            if (groupLength === 0) {
                alert('Missing icons config!');
                return false;
            }

            var emoji_container = '<div class="emoji_container" id="emoji_container_' + ix + '">';
            var emoji_content = '<div class="emoji_content">';
            var emoji_tab = '<div class="emoji_tab" style="' + (groupLength === 1 && !showTab ? 'display:none;' : '') + '"><div class="emoji_tab_prev"></div><div class="emoji_tab_list"><ul>';
            var panel,
                name,
                path,
                maxNum,
                excludeNums,
                file,
                placeholder,
                alias,
                title,
                index,
                notation;
            for (var i = 0; i < groupLength; i++) {
                name = iconsGroup[i].name || 'group' + (i + 1);
                path = iconsGroup[i].path;
                maxNum = iconsGroup[i].maxNum;
                excludeNums = iconsGroup[i].excludeNums;
                file = iconsGroup[i].file || '.jpg';
                placeholder = iconsGroup[i].placeholder || '#em' + (i + 1) + '_{alias}#';
                alias = iconsGroup[i].alias;
                title = iconsGroup[i].title;
                index = 0;
                if (!path || !maxNum) {
                    alert('The ' + i + ' index of icon groups has error config!');
                    continue;
                }
                panel = '<div id="emoji' + i + '" class="emoji_icons" style="' + (i === 0 ? '' : 'display:none;') + '"><ul>';
                for (var j = 1; j <= maxNum; j++) {
                    if (excludeNums && excludeNums.indexOf(j) >= 0) {
                        continue;
                    }
                    if (alias) {
                        if (typeof alias !== 'object') {
                            alert('Error config about alias!');
                            break;
                        }
                        notation = placeholder.replace(new RegExp('{alias}', 'gi'), alias[j].toString());
                    } else {
                        notation = placeholder.replace(new RegExp('{alias}', 'gi'), j.toString());
                    }
                    panel += '<li><a data-emoji_code="' + notation + '" data-index="' + index + '" title="' + (title && title[j] ? title[j] : '') + '"><img src="' + path + j + file + '"/></a></li>';
                    index++;
                }
                panel += '</ul></div>';
                emoji_content += panel;
                emoji_tab += '<li data-emoji_tab="emoji' + i + '" class="' + (i === 0 ? 'selected' : '') + '" title="' + name + '">' + name + '</li>';
            }
            emoji_content += '</div>';
            emoji_tab += '</ul></div><div class="emoji_tab_next"></div></div>';
            var emoji_preview = '<div class="emoji_preview"><img/></div>';
            emoji_container += emoji_content;
            emoji_container += emoji_tab;
            emoji_container += emoji_preview;

            $(emoji_container).appendTo($('body'));

            btnTop = $(btn).offset().top + $(btn).outerHeight() + 5;
            btnLeft = $(btn).offset().left;
            $('#emoji_container_' + ix).css({'bottom': 30 + 'px', 'left': 200 + 'px'});

            $('#emoji_container_' + ix + ' .emoji_content').mCustomScrollbar({
                theme: 'minimal-dark',
                scrollbarPosition: 'inside',
                mouseWheel: {
                    scrollAmount: 275
                }
            });

            var pageCount = groupLength % 8 === 0 ? parseInt(groupLength / 8) : parseInt(groupLength / 8) + 1;
            var pageIndex = 1;
            $(document).on({
                'click': function (e) {
                    var target = e.target;
                    var field = that.$content[0];
                    var code,
                        tab,
                        imgSrc,
                        insertHtml;
                    if (target === $(btn)[0]) {
                        $('#emoji_container_' + ix)[that.toggleFunc]();
                        that.$content.focus();
                    } else if ($(target).parents('#emoji_container_' + ix).length > 0) {
                        code = $(target).data('emoji_code') || $(target).parent().data('emoji_code');
                        tab = $(target).data('emoji_tab');
                        if (code) {
                            if (field.nodeName === 'DIV') {
                                imgSrc = $('#emoji_container_' + ix + ' a[data-emoji_code="' + code + '"] img').attr('src');
                                insertHtml = "<img class='emoji_icon' style='vertical-align: middle;' src='" + imgSrc + "'/>";
                                that._insertAtCursor(field, insertHtml, false);
                            } else {
                                that._insertAtCursor(field, code);
                            }
                            that.hide();
                        }
                        else if (tab) {
                            if (!$(target).hasClass('selected')) {
                                $('#emoji_container_' + ix + ' .emoji_icons').hide();
                                $('#emoji_container_' + ix + ' #' + tab).show();
                                $(target).addClass('selected').siblings().removeClass('selected');
                            }
                        } else if ($(target).hasClass('emoji_tab_prev')) {
                            if (pageIndex > 1) {
                                $('#emoji_container_' + ix + ' .emoji_tab_list ul').css('margin-left', ('-503' * (pageIndex - 2)) + 'px');
                                pageIndex--;
                            }

                        } else if ($(target).hasClass('emoji_tab_next')) {
                            if (pageIndex < pageCount) {
                                $('#emoji_container_' + ix + ' .emoji_tab_list ul').css('margin-left', ('-503' * pageIndex) + 'px');
                                pageIndex++;
                            }
                        }
                        that.$content.focus();
                    } else if ($('#emoji_container_' + ix + ':visible').length > 0) {
                        that.hide();
                        that.$content.focus();
                    }
                }
            });

            $('#emoji_container_' + ix + ' .emoji_icons a').mouseenter(function () {
                var index = $(this).data('index');
                if (parseInt(index / 5) % 2 === 0) {
                    $('#emoji_container_' + ix + ' .emoji_preview').css({'left': 'auto', 'right': 0});
                } else {
                    $('#emoji_container_' + ix + ' .emoji_preview').css({'left': 0, 'right': 'auto'});
                }
                var src = $(this).find('img').attr('src');
                $('#emoji_container_' + ix + ' .emoji_preview img').attr('src', src).parent().show();
            });

            $('#emoji_container_' + ix + ' .emoji_icons a').mouseleave(function () {
                $('#emoji_container_' + ix + ' .emoji_preview img').removeAttr('src').parent().hide();
            });
        },

        _insertAtCursor: function (field, value, selectPastedContent) {
            var sel, range;
            if (field.nodeName === 'DIV') {
                field.focus();
                if (window.getSelection) {
                    sel = window.getSelection();
                    if (sel.getRangeAt && sel.rangeCount) {
                        range = sel.getRangeAt(0);
                        range.deleteContents();
                        var el = document.createElement('div');
                        el.innerHTML = value;
                        var frag = document.createDocumentFragment(), node, lastNode;
                        while ((node = el.firstChild)) {
                            lastNode = frag.appendChild(node);
                        }
                        var firstNode = frag.firstChild;
                        range.insertNode(frag);

                        if (lastNode) {
                            range = range.cloneRange();
                            range.setStartAfter(lastNode);
                            if (selectPastedContent) {
                                range.setStartBefore(firstNode);
                            } else {
                                range.collapse(true);
                            }
                            sel.removeAllRanges();
                            sel.addRange(range);
                        }
                    }
                } else if ((sel = document.selection) && sel.type !== 'Control') {
                    var originalRange = sel.createRange();
                    originalRange.collapse(true);
                    sel.createRange().pasteHTML(html);
                    if (selectPastedContent) {
                        range = sel.createRange();
                        range.setEndPoint('StartToStart', originalRange);
                        range.select();
                    }
                }
            } else {
                if (document.selection) {
                    field.focus();
                    sel = document.selection.createRange();
                    sel.text = value;
                    sel.select();
                }
                else if (field.selectionStart || field.selectionStart === 0) {
                    var startPos = field.selectionStart;
                    var endPos = field.selectionEnd;
                    var restoreTop = field.scrollTop;
                    field.value = field.value.substring(0, startPos) + value + field.value.substring(endPos, field.value.length);
                    if (restoreTop > 0) {
                        field.scrollTop = restoreTop;
                    }
                    field.focus();
                    field.selectionStart = startPos + value.length;
                    field.selectionEnd = startPos + value.length;
                } else {
                    field.value += value;
                    field.focus();
                }
            }

        },

        show: function () {
            $('#emoji_container_' + this.index)[this.showFunc]();
        },

        hide: function () {
            $('#emoji_container_' + this.index)[this.hideFunc]();
        },

        toggle: function () {
            $('#emoji_container_' + this.index)[this.toggleFunc]();
        }
    };

    function fn(option) {
        emoji_index++;
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('plugin_' + PLUGIN_NAME + emoji_index);
            var options = $.extend({}, DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) $this.data('plugin_' + PLUGIN_NAME + emoji_index, (data = new Plugin(this, options)));
            if (typeof option === 'string') data[option]();
        });
    }

    $.fn[PLUGIN_NAME] = fn;
    $.fn[PLUGIN_NAME].Constructor = Plugin;

}(jQuery, window, document));

(function ($, window, document) {

    var PLUGIN_NAME = 'emojiParse',
        VERSION = '1.1.0',
        DEFAULTS = {
            icons: []
        };

    function Plugin(element, options) {
        this.$content = $(element);
        this.options = options;
        this._init();
    }

    Plugin.prototype = {
        _init: function () {
            var that = this;
            var iconsGroup = this.options.icons;
            var groupLength = iconsGroup.length;
            var path,
                file,
                placeholder,
                alias,
                pattern,
                regexp,
                revertAlias = {};
            if (groupLength > 0) {
                for (var i = 0; i < groupLength; i++) {
                    path = iconsGroup[i].path;
                    file = iconsGroup[i].file || '.jpg';
                    placeholder = iconsGroup[i].placeholder;
                    alias = iconsGroup[i].alias;
                    if (!path) {
                        alert('Path not config!');
                        continue;
                    }
                    if (alias) {
                        for (var attr in alias) {
                            if (alias.hasOwnProperty(attr)) {
                                revertAlias[alias[attr]] = attr;
                            }
                        }
                        pattern = placeholder.replace(new RegExp('{alias}', 'gi'), '([\\s\\S]+?)');
                        regexp = new RegExp(pattern, 'gm');
                        that.$content.html(that.$content.html().replace(regexp, function ($0, $1) {
                            var n = revertAlias[$1];
                            if (n) {
                                return "<img class='emoji_icon' src='" + path + n + file + "'/>";
                            } else {
                                return $0;
                            }
                        }));
                    } else {
                        pattern = placeholder.replace(new RegExp('{alias}', 'gi'), '(\\d+?)');
                        that.$content.html(that.$content.html().replace(new RegExp(pattern, 'gm'), "<img class='emoji_icon' src='" + path + "$1" + file + "'/>"));
                    }
                }
            }
        }
    };

    function fn(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('plugin_' + PLUGIN_NAME);
            var options = $.extend({}, DEFAULTS, $this.data(), typeof option === 'object' && option);

            if (!data) $this.data('plugin_' + PLUGIN_NAME, (data = new Plugin(this, options)));
            if (typeof option === 'string') data[option]();
        });
    }

    $.fn[PLUGIN_NAME] = fn;
    $.fn[PLUGIN_NAME].Constructor = Plugin;

}(jQuery, window, document));
