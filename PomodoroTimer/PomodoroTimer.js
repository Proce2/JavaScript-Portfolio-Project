$(function() {

    var model = {
        paused: true,
        currentStatus: 'work',
        countdown: 25 * 60,
        status: {
            work: {
                minutes: 25,
                seconds: 25 * 60,
            },
            play: {
                minutes: 5,
                seconds: 5 * 60,
            }
        }
    }

    var pomodoro = {
        init: function() {
            this.cacheDOM();
            this.bindEvents();
        },
        cacheDOM: function() {
            this.$pom = $('.pom');
            this.$motivator = $('#motivator');
            this.$countdown = $('#countdown');
            this.$progressBar = $('.progress-bar');
            this.$btnTime = $('.btn-time');
            this.$btnMain = $('.btn-main');
            this.$controlGroup = $('.control-group');
            this.$workTime = $('#workTime');
            this.$playTime = $('#playTime');
        },
        bindEvents: function() {
            this.$btnTime.on('click', this.setMinutes.bind(this));
            this.$btnMain.on('click', this.start.bind(this));
        },
        setMinutes: function(e) {
            var inc = $(e.target).attr('value');
            var status = $(e.target).attr('data');
            if ((model.status[status].minutes + Number(inc)) > 0) {
                model.status[status].minutes += Number(inc);
                model.status[status].seconds = model.status[status].minutes * 60;
                model.countdown = model.status[status].seconds;
                view.renderSettings();
            }
        },
        start: function() {
            if (model.paused) {
                model.paused = false;
                this.countdown();
                model.intervalID = setInterval(this.countdown, 1000);
                this.$btnMain.html('<i class="fa fa-pause"></i>');
                view.renderSettings();
            } else {
                model.paused = true;
                clearInterval(model.intervalID);
                this.$btnMain.html('<i class="fa fa-play"></i>');
                view.renderSettings();
                view.render();
            }
        },

        countdown: function() {
            if (model.countdown > 0) {
                model.countdown--;
                view.render();
            } else {
                pomodoro.audioPing();
                (model.currentStatus === 'work') ? model.currentStatus = 'play': model.currentStatus = 'work';
                model.countdown = model.status[model.currentStatus].seconds;
            }
        },

        audioPing: function() {
            var audioContext = new AudioContext();
            var kFreq = 660,
                kDecayTime = 0.5,
                kStartTime = 0,
                kGain = 0.25;
            var oscNode = audioContext.createOscillator();
            oscNode.frequency.value = kFreq;
            var gainNode = audioContext.createGain();
            gainNode.gain.value = kGain;
            gainNode.gain.setTargetAtTime(0.0, audioContext.currentTime, kDecayTime);
            oscNode.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscNode.start(audioContext.currentTime + kStartTime);
            oscNode.stop(audioContext.currentTime + kStartTime + 12 * kDecayTime);
        }
    }

    var view = {

        formatTime: function(s) {
            var minutes = "0" + Math.floor(s / 60);
            var seconds = "0" + (s - minutes * 60);
            return minutes.substr(-2) + ":" + seconds.substr(-2);
        },

        renderSettings: function() {
            if (model.paused === false) {
                pomodoro.$controlGroup.closest('.col').removeClass('fadeInUp').addClass('fadeOutDown');
            } else {
                pomodoro.$controlGroup.closest('.col').removeClass('fadeOutDown').addClass('fadeInUp');
                pomodoro.$workTime.text(model.status.work.minutes);
                pomodoro.$playTime.text(model.status.play.minutes);
                pomodoro.$countdown.text(this.formatTime(model.status[model.currentStatus].seconds));
            }
        },

        showProgress: function() {
            var a = model.countdown;
            var b = model.status[model.currentStatus].seconds;
            percentage = 100 - a / b * 100;
            pomodoro.$progressBar.css('width', percentage + '%');
        },

        render: function() {
            this.showProgress();
            if (model.paused) {
                pomodoro.$motivator.html('Ready, set<span>...</span>');
                pomodoro.$pom.removeClass('work play paused').addClass('paused');
            } else if (model.currentStatus === 'work') {
                pomodoro.$motivator.html('Work <span>:)</span>');
                pomodoro.$pom.removeClass('work play paused').addClass('work');
            } else if (model.currentStatus === 'play') {
                pomodoro.$motivator.html('Play hard <span>;)</span>');
                pomodoro.$pom.removeClass('work play paused').addClass('play');
            }
            pomodoro.$countdown.text(this.formatTime(model.countdown));
        },
    }

    pomodoro.init();
});