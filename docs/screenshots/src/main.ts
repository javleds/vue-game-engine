import { createApp, ref } from 'vue'
import {
  EngineActionDialog,
  EngineCardShell,
  EngineCardStack,
  EngineChatForm,
  EngineChatMessages,
  EngineDeckCard,
  EngineFloatingChat,
  EngineGalleryOverlay,
  EngineHelpButton,
  EngineHelpModal,
  EngineLobbyChat,
  EngineLobbyPlayerList,
  EnginePlayerStatusPanel,
  EngineRoomSummary,
  EngineTabs,
  EngineTurnOrder,
  installTurnEngineComponentStyles,
} from '@engine/index'
import type { ChatMessageView, EngineChatTab, EngineTabOption, EngineTurnPlayer, LobbyPlayer } from '@engine/index'
import './theme.css'

installTurnEngineComponentStyles()

const messages: ChatMessageView[] = [
  {
    id: 'm1',
    roomId: 'R-204',
    playerId: 'p1',
    nickname: 'Ariadna',
    kind: 'chat',
    message: 'I can close the round after this move.',
    createdAt: '2026-06-21T16:30:00Z',
  },
  {
    id: 'm2',
    roomId: 'R-204',
    playerId: 'p2',
    nickname: 'Mateo',
    kind: 'activity',
    message: 'Mateo drew two cards.',
    createdAt: '2026-06-21T16:31:00Z',
  },
]

const lobbyPlayers: LobbyPlayer[] = [
  { id: 'p1', nickname: 'Ariadna', is_host: true, connected: true },
  { id: 'p2', nickname: 'Mateo', is_host: false, connected: true },
  { id: 'p3', nickname: 'Lucia', is_host: false, connected: false },
]

const turnPlayers: EngineTurnPlayer[] = [
  { playerId: 'p1', nickname: 'Ariadna', connected: true },
  { playerId: 'p2', nickname: 'Mateo', connected: true },
  { playerId: 'p3', nickname: 'Lucia', connected: false },
  { playerId: 'p4', nickname: 'Noah', connected: true },
]

const tabs: EngineTabOption[] = [
  { id: 'hand', label: 'Hand' },
  { id: 'market', label: 'Market' },
  { id: 'log', label: 'Log', disabled: true },
]

const App = {
  components: {
    EngineActionDialog,
    EngineCardShell,
    EngineCardStack,
    EngineChatForm,
    EngineChatMessages,
    EngineDeckCard,
    EngineFloatingChat,
    EngineGalleryOverlay,
    EngineHelpButton,
    EngineHelpModal,
    EngineLobbyChat,
    EngineLobbyPlayerList,
    EnginePlayerStatusPanel,
    EngineRoomSummary,
    EngineTabs,
    EngineTurnOrder,
  },
  setup() {
    return {
      activeTab: ref('hand'),
      chatOpen: ref(true),
      chatTab: ref<EngineChatTab>('chat'),
      draft: ref('Ready for the next round'),
      galleryOpen: ref(true),
      helpOpen: ref(true),
      lobbyDraft: ref('Hello table'),
      lobbyPlayers,
      messages,
      tabs,
      turnPlayers,
    }
  },
  template: `
    <main class="shots">
      <section class="shot shot-wide" data-shot="EngineRoomSummary">
        <EngineRoomSummary room-id="R-204" title="Moonlit Market" eyebrow="Private room" can-copy-resume />
      </section>

      <section class="shot" data-shot="EngineLobbyPlayerList">
        <EngineLobbyPlayerList :players="lobbyPlayers" connected-label="Online" disconnected-label="Offline" host-label="Host" />
      </section>

      <section class="shot shot-wide" data-shot="EngineTurnOrder">
        <EngineTurnOrder :players="turnPlayers" current-player-id="p2" round-end-player-id="p4" current-label="Current" round-end-label="Round end" />
      </section>

      <section class="shot" data-shot="EngineChatMessages">
        <EngineChatMessages :messages="messages" />
      </section>

      <section class="shot shot-narrow" data-shot="EngineChatForm">
        <EngineChatForm v-model:draft="draft" submit-label="Send" />
      </section>

      <section class="shot" data-shot="EngineLobbyChat">
        <EngineLobbyChat v-model:draft="lobbyDraft" :messages="messages" title="Lobby chat" send-label="Send" />
      </section>

      <section class="shot floating-shot" data-shot="EngineFloatingChat">
        <EngineFloatingChat
          v-model:open="chatOpen"
          v-model:draft="draft"
          v-model:active-tab="chatTab"
          :chat-messages="messages"
          :activity-messages="messages"
          title="Table chat"
          activity-label="Activity"
          send-label="Send"
        />
      </section>

      <section class="shot shot-narrow" data-shot="EngineHelpButton">
        <EngineHelpButton label="Open help" />
      </section>

      <section class="shot modal-shot" data-shot="EngineHelpModal">
        <EngineHelpModal v-model:open="helpOpen" title="How to play" eyebrow="Rules">
          <p>Collect sets, spend actions, and time the final round before the table catches up.</p>
        </EngineHelpModal>
      </section>

      <section class="shot modal-shot" data-shot="EngineActionDialog">
        <EngineActionDialog open title="End turn?" body="Confirming will pass control to the next player." confirm-label="End turn" cancel-label="Keep playing" show-close />
      </section>

      <section class="shot card-shot" data-shot="EngineCardShell">
        <EngineCardShell inspectable>
          <div class="sample-card">
            <strong>Moon Gate</strong>
            <span>2 actions</span>
          </div>
        </EngineCardShell>
      </section>

      <section class="shot card-shot" data-shot="EngineCardStack">
        <EngineCardStack>
          <div class="sample-card stacked">Scout</div>
          <div class="sample-card stacked">Trader</div>
          <div class="sample-card stacked">Courier</div>
        </EngineCardStack>
      </section>

      <section class="shot card-shot" data-shot="EngineDeckCard">
        <EngineDeckCard label="Draw pile" />
      </section>

      <section class="shot shot-wide" data-shot="EngineTabs">
        <EngineTabs v-model="activeTab" :tabs="tabs" tablist-label="Game panels" />
      </section>

      <section class="shot" data-shot="EnginePlayerStatusPanel">
        <EnginePlayerStatusPanel
          title="Ariadna"
          subtitle="Blue player"
          :stats="[{ id: 'score', label: '12 points' }, { id: 'cards', label: '5 cards' }]"
          is-current-turn
          current-turn-label="Turn"
        >
          <p class="panel-note">Planning a market action.</p>
        </EnginePlayerStatusPanel>
      </section>

      <section class="shot gallery-shot" data-shot="EngineGalleryOverlay">
        <EngineGalleryOverlay
          :open="galleryOpen"
          title="Discard pile"
          position-text="2 / 8"
          show-action
          action-label="Play card"
          action-title="Play selected card"
        >
          <div class="sample-card gallery-card">
            <strong>Silver Compass</strong>
            <span>Move one extra space.</span>
          </div>
        </EngineGalleryOverlay>
      </section>
    </main>
  `,
}

createApp(App).mount('#app')
