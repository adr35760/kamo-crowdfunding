"use client";

import { useMemo, useState } from "react";
import type { Reward } from "@/lib/types";

const yen = (n: number) => n.toLocaleString("ja-JP");

/**
 * 支援（リターン選択〜応援メッセージ〜確認）の画面。
 * 第1段では決済を接続しない（PRD §2）。確定ボタンは押しても送信せず、
 * 「未接続」であることを画面に明示する。
 */
export function PledgeForm({ rewards }: { rewards: Reward[] }) {
  const selectable = rewards.filter((r) => r.isActive);
  const [selectedId, setSelectedId] = useState<string>(selectable[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const selected = useMemo(
    () => selectable.find((r) => r.id === selectedId) ?? null,
    [selectable, selectedId],
  );
  const total = (selected?.price ?? 0) * quantity;

  return (
    <div>
      <div className="stub">
        <b>この画面はスタブです。</b>
        決済（ソフトバンクペイメント）と会員認証は第1段では未接続のため、
        ここで確定しても支払いは発生しません。金額・数量・応援メッセージの
        入力と確認までは本番と同じ流れで動きます。
      </div>

      <div className="rwhd" style={{ marginTop: 28 }}>
        <h3>リターンを選ぶ</h3>
        <span>{selectable.length}コース</span>
      </div>

      <div className="pick">
        {selectable.map((r) => {
          const soldOut =
            r.quantityLimit !== null && r.claimedCount >= r.quantityLimit;
          return (
            <label className="pick__row" key={r.id}>
              <input
                type="radio"
                name="reward"
                value={r.id}
                checked={selectedId === r.id}
                disabled={soldOut}
                onChange={() => {
                  setSelectedId(r.id);
                  setConfirmed(false);
                }}
                style={{ marginTop: 8 }}
              />
              <span className="rw__p">¥{yen(r.price)}</span>
              <span className="pick__body">
                <span className="rw__t" style={{ display: "block" }}>
                  {r.title}
                  {soldOut ? "（SOLD OUT）" : ""}
                </span>
                <span className="rw__d" style={{ display: "block" }}>
                  {r.description}
                </span>
                <span className="rw__meta" style={{ display: "flex" }}>
                  <span>{r.deliveryEstimate}</span>
                  <span>
                    {soldOut
                      ? "SOLD OUT"
                      : r.quantityLimit === null
                        ? "数量制限なし"
                        : `残り${r.quantityLimit - r.claimedCount}／${r.quantityLimit}`}
                  </span>
                </span>
              </span>
            </label>
          );
        })}
      </div>

      <div className="form">
        <div className="field">
          <label htmlFor="quantity">数量</label>
          <div className="qty">
            <input
              id="quantity"
              type="number"
              min={1}
              max={10}
              value={quantity}
              onChange={(e) => {
                setQuantity(Math.max(1, Math.min(10, Number(e.target.value) || 1)));
                setConfirmed(false);
              }}
            />
            <span className="hint">1〜10まで</span>
          </div>
        </div>

        <div className="field">
          <label htmlFor="message">応援メッセージ（任意）</label>
          <textarea
            id="message"
            value={message}
            maxLength={400}
            placeholder="起案者へ届けたいメッセージ"
            onChange={(e) => {
              setMessage(e.target.value);
              setConfirmed(false);
            }}
          />
          <span className="hint">
            {message.length}／400文字・公開されます（氏名は任意で匿名にできます）
          </span>
        </div>

        <div className="field">
          <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => {
                setIsAnonymous(e.target.checked);
                setConfirmed(false);
              }}
              style={{ width: "auto" }}
            />
            匿名で支援する
          </label>
        </div>

        <div className="stub" style={{ marginTop: 4 }}>
          <b>お支払い合計：¥{yen(total)}</b>
          <br />
          {selected ? `${selected.title} × ${quantity}` : "リターンを選択してください"}
        </div>

        <div className="btns">
          <button
            type="button"
            className="btn"
            onClick={() => setConfirmed(true)}
            disabled={!selected}
          >
            入力内容を確認する
          </button>
        </div>

        {confirmed ? (
          <div className="stub" role="status">
            <b>確認画面（スタブ）</b>
            <br />
            決済は未接続のため、この先へは進めません。接続は次段（ソフトバンクペイメント）です。
            <br />
            支援額 ¥{yen(total)}／{selected?.title} × {quantity}
            {message ? `／応援メッセージ ${message.length}文字` : ""}
            {isAnonymous ? "／匿名" : ""}
          </div>
        ) : null}
      </div>
    </div>
  );
}
