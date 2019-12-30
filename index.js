module.exports = function NekoChannelCLI(mod) {
const {command} = mod.require
	
	let currentChannel = 0
	let meow = null

	// Commands
    command.add(['ch', 'c'], (meow) => {
		// wechsel zu channel x
		if (!isNaN(meow)) changeChannel(meow),
			console.log('Switching to channel'+" " +meow)
		// wechsel zum nächsten chan
		else if (['n'].includes(meow)) changeChannel(currentChannel.channel + 1),
			console.log('Switching to next channel')
		// change zum letzten chan
		else if (['b'].includes(meow)) changeChannel(currentChannel.channel - 1),
			console.log('Switching to previous channel')
		else console.log('invalid parameter. Usage : ch (Channel number)');
	});

	// Code
	mod.hook('S_CURRENT_CHANNEL', 2, (event) => { currentChannel = event });


	function changeChannel(newChannel) {
		if (currentChannel.channel > 20) return
		if (newChannel == 0) newChannel = 10;
		if (newChannel == currentChannel.channel) {
			console.log('You already on this channel.');
			return
		}
		newChannel -= 1;
		mod.send('C_SELECT_CHANNEL', 1, {
			unk: 1,
			zone: currentChannel.zone,
			channel: newChannel
		});
	}

	function send(msg) { mod.command.message(': ' + msg); }

}